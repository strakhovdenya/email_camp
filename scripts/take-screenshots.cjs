const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Загружаем переменные окружения из .env.local
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Конфигурация авторизации (можно переопределить через переменные окружения)
const AUTH_CONFIG = {
  email: process.env.SCREENSHOT_EMAIL || 'admin@example.com',
  password: process.env.SCREENSHOT_PASSWORD || 'admin123',
  baseUrl: process.env.SCREENSHOT_BASE_URL || 'http://localhost:3000'
};

// Страницы, которые нужно снимать ДО авторизации
const pagesBeforeAuth = [
  { url: `${AUTH_CONFIG.baseUrl}/auth`, name: 'auth-page', title: 'Авторизация' },
  { url: `${AUTH_CONFIG.baseUrl}/auth/signup`, name: 'signup-page', title: 'Регистрация' },
];

// Страницы, которые нужно снимать ПОСЛЕ авторизации
const pagesAfterAuth = [
  // Основные страницы приложения
  { url: `${AUTH_CONFIG.baseUrl}`, name: 'homepage', title: 'Главная страница' },
  { url: `${AUTH_CONFIG.baseUrl}/room/101`, name: 'room-page', title: 'Страница комнаты' },
  { url: `${AUTH_CONFIG.baseUrl}/deliver/101`, name: 'deliver-page', title: 'Выдача писем' },
  
  // Админские страницы
  { url: `${AUTH_CONFIG.baseUrl}/admin`, name: 'admin-dashboard', title: 'Админ панель' },
  { url: `${AUTH_CONFIG.baseUrl}/admin/letters`, name: 'admin-letters', title: 'Управление письмами' },
  { url: `${AUTH_CONFIG.baseUrl}/admin/users`, name: 'admin-users', title: 'Управление пользователями' },
  { url: `${AUTH_CONFIG.baseUrl}/admin/rooms`, name: 'admin-rooms', title: 'Управление комнатами' },
  
  // Showcase страницы
  { url: `${AUTH_CONFIG.baseUrl}/showcase`, name: 'showcase-overview', title: 'Обзор проекта' },
  { url: `${AUTH_CONFIG.baseUrl}/showcase/demo`, name: 'showcase-demo', title: 'Демо приложения' },
  { url: `${AUTH_CONFIG.baseUrl}/showcase/features`, name: 'showcase-features', title: 'Возможности' },
  // { url: `${AUTH_CONFIG.baseUrl}/showcase/gallery`, name: 'showcase-gallery', title: 'Галерея' }, // Исключено - рекурсия
  { url: `${AUTH_CONFIG.baseUrl}/showcase/tech-stack`, name: 'showcase-tech', title: 'Технологии' },
  { url: `${AUTH_CONFIG.baseUrl}/showcase/architecture`, name: 'showcase-architecture', title: 'Архитектура' },
];

// Все страницы для генерации конфигурации
const allPages = [...pagesBeforeAuth, ...pagesAfterAuth];

// Конфигурация устройств
const devices = [
  {
    name: 'desktop',
    viewport: { width: 1920, height: 1080 },
    folder: 'desktop'
  },
  {
    name: 'mobile',
    viewport: { width: 375, height: 812 },
    folder: 'mobile'
  }
];

// Функция авторизации администратора
async function loginAsAdmin(page) {
  console.log(`  🔐 Авторизуюсь как ${AUTH_CONFIG.email}...`);
  
  try {
    // Переходим на страницу авторизации
    await page.goto(`${AUTH_CONFIG.baseUrl}/auth`, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Ждем загрузки формы
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    
    // Заполняем форму авторизации
    await page.fill('input[type="email"]', AUTH_CONFIG.email);
    await page.fill('input[type="password"]', AUTH_CONFIG.password);
    
    // Нажимаем кнопку входа
    await page.click('button[type="submit"]');
    
    // Ждем редиректа после авторизации
    await page.waitForURL(`${AUTH_CONFIG.baseUrl}/`, { timeout: 10000 });
    
    console.log('  ✅ Авторизация успешна');
    return true;
    
  } catch (error) {
    console.log(`  ⚠️ Ошибка авторизации: ${error.message}`);
    console.log('  💡 Убедитесь что:');
    console.log(`     - Сервер запущен на ${AUTH_CONFIG.baseUrl}`);
    console.log(`     - Пользователь ${AUTH_CONFIG.email} существует`);
    console.log('     - Пароль правильный');
    return false;
  }
}

// Функция для создания одного скриншота
async function takeScreenshot(page, pageConfig, baseDir, device) {
  try {
    console.log(`  📸 ${pageConfig.title} (${pageConfig.name})`);
    
    // Переходим на страницу
    await page.goto(pageConfig.url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Ждем загрузки контента
    await page.waitForTimeout(3000);
    
    // Скрываем скроллбары для чистого скриншота
    await page.addStyleTag({
      content: `
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
        body { overflow-x: hidden; }
      `
    });
    
    // Ждем загрузки всех изображений и анимаций
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Делаем полностраничный скриншот
    const screenshotPath = path.join(
      baseDir, 
      device.folder, 
      `${pageConfig.name}.png`
    );
    
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: 'png',
      animations: 'disabled' // Отключаем анимации для стабильных скриншотов
    });
    
    console.log(`    ✅ Сохранен: ${screenshotPath}`);
    
  } catch (error) {
    console.log(`    ❌ Ошибка для ${pageConfig.url}: ${error.message}`);
  }
}

async function takeScreenshots() {
  const browser = await chromium.launch();
  
  // Создаем папки если их нет
  const baseDir = path.join(__dirname, '..', 'public', 'images', 'gallery');
  for (const device of devices) {
    const deviceDir = path.join(baseDir, device.folder);
    if (!fs.existsSync(deviceDir)) {
      fs.mkdirSync(deviceDir, { recursive: true });
    }
  }

  for (const device of devices) {
    console.log(`\n📱 Создаю ${device.name} скриншоты...`);
    
    const context = await browser.newContext({
      viewport: device.viewport,
      deviceScaleFactor: 2, // Для четких скриншотов
    });
    
    const page = await context.newPage();
    
    // СНАЧАЛА делаем скриншоты страниц авторизации (до входа в систему)
    console.log('  📸 Скриншоты страниц авторизации (до входа)...');
    for (const pageConfig of pagesBeforeAuth) {
      await takeScreenshot(page, pageConfig, baseDir, device);
    }
    
    // ЗАТЕМ авторизуемся и делаем скриншоты остальных страниц
    console.log('  🔐 Авторизуюсь для остальных страниц...');
    const isLoggedIn = await loginAsAdmin(page);
    
    if (isLoggedIn) {
      console.log('  📸 Скриншоты страниц после авторизации...');
      for (const pageConfig of pagesAfterAuth) {
        await takeScreenshot(page, pageConfig, baseDir, device);
      }
    } else {
      console.log('  ⚠️ Не удалось авторизоваться, пропускаю страницы после авторизации');
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('\n🎉 Все скриншоты готовы!');
  
  // Генерируем обновленную конфигурацию для галереи
  generateGalleryConfig();
}

function generateGalleryConfig() {
  console.log('\n📝 Генерирую конфигурацию для галереи...');
  
  const galleryItems = [];
  let id = 1;
  
  // Добавляем desktop версии
  for (const pageConfig of allPages) {
    // Определяем категорию
    let category = 'features';
    if (pageConfig.name.includes('admin')) {
      category = 'admin';
    } else if (['homepage', 'room-page', 'deliver-page'].includes(pageConfig.name)) {
      category = 'desktop';
    }
    
    // Определяем теги
    const tags = [];
    if (pageConfig.name.includes('admin')) tags.push('Админ');
    if (pageConfig.name.includes('auth')) tags.push('Авторизация');
    if (pageConfig.name.includes('showcase')) tags.push('Showcase');
    if (pageConfig.name.includes('room')) tags.push('Комнаты');
    if (pageConfig.name.includes('deliver')) tags.push('Выдача');
    if (pageConfig.name.includes('letters')) tags.push('Письма');
    if (pageConfig.name.includes('users')) tags.push('Пользователи');
    
    galleryItems.push({
      id: id.toString(),
      title: pageConfig.title,
      description: `Скриншот страницы: ${pageConfig.title}`,
      category: category,
      image: `/images/gallery/desktop/${pageConfig.name}.png`,
      tags: tags.length ? tags : ['UI/UX']
    });
    
    id++;
  }
  
  // Добавляем mobile версии
  for (const pageConfig of allPages) {
    // Определяем теги для мобильной версии
    const tags = ['Мобильный'];
    if (pageConfig.name.includes('admin')) tags.push('Админ');
    if (pageConfig.name.includes('auth')) tags.push('Авторизация');
    if (pageConfig.name.includes('showcase')) tags.push('Showcase');
    if (pageConfig.name.includes('room')) tags.push('Комнаты');
    if (pageConfig.name.includes('deliver')) tags.push('Выдача');
    if (pageConfig.name.includes('letters')) tags.push('Письма');
    if (pageConfig.name.includes('users')) tags.push('Пользователи');
    
    galleryItems.push({
      id: id.toString(),
      title: `${pageConfig.title} (Мобильная)`,
      description: `Мобильная версия: ${pageConfig.title}`,
      category: 'mobile',
      image: `/images/gallery/mobile/${pageConfig.name}.png`,
      tags: tags
    });
    
    id++;
  }
  
  // Сохраняем конфигурацию в файл
  const configPath = path.join(__dirname, 'gallery-config.json');
  fs.writeFileSync(configPath, JSON.stringify(galleryItems, null, 2));
  
  console.log(`✅ Конфигурация сохранена: ${configPath}`);
  console.log('\n📋 Теперь скопируйте содержимое gallery-config.json в src/app/showcase/gallery/page.tsx');
}

// Запускаем скрипт
takeScreenshots().catch(console.error); 