const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Конфигурация страниц для скриншотов
const pages = [
  // Основные страницы приложения
  { url: 'http://localhost:3000', name: 'homepage', title: 'Главная страница' },
  { url: 'http://localhost:3000/room/101', name: 'room-page', title: 'Страница комнаты' },
  { url: 'http://localhost:3000/deliver/101', name: 'deliver-page', title: 'Выдача писем' },
  { url: 'http://localhost:3000/auth', name: 'auth-page', title: 'Авторизация' },
  { url: 'http://localhost:3000/auth/signup', name: 'signup-page', title: 'Регистрация' },
  
  // Админские страницы
  { url: 'http://localhost:3000/admin', name: 'admin-dashboard', title: 'Админ панель' },
  { url: 'http://localhost:3000/admin/letters', name: 'admin-letters', title: 'Управление письмами' },
  { url: 'http://localhost:3000/admin/users', name: 'admin-users', title: 'Управление пользователями' },
  { url: 'http://localhost:3000/admin/rooms', name: 'admin-rooms', title: 'Управление комнатами' },
  
  // Showcase страницы
  { url: 'http://localhost:3000/showcase', name: 'showcase-overview', title: 'Обзор проекта' },
  { url: 'http://localhost:3000/showcase/demo', name: 'showcase-demo', title: 'Демо приложения' },
  { url: 'http://localhost:3000/showcase/features', name: 'showcase-features', title: 'Возможности' },
  { url: 'http://localhost:3000/showcase/gallery', name: 'showcase-gallery', title: 'Галерея' },
  { url: 'http://localhost:3000/showcase/tech-stack', name: 'showcase-tech', title: 'Технологии' },
  { url: 'http://localhost:3000/showcase/architecture', name: 'showcase-architecture', title: 'Архитектура' },
];

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
    
    for (const pageConfig of pages) {
      try {
        console.log(`  📸 ${pageConfig.title} (${pageConfig.name})`);
        
        // Переходим на страницу
        await page.goto(pageConfig.url, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });
        
        // Ждем загрузки контента
        await page.waitForTimeout(2000);
        
        // Скрываем скроллбары для чистого скриншота
        await page.addStyleTag({
          content: `
            ::-webkit-scrollbar { display: none; }
            * { scrollbar-width: none; }
          `
        });
        
        // Делаем полностраничный скриншот
        const screenshotPath = path.join(
          baseDir, 
          device.folder, 
          `${pageConfig.name}.png`
        );
        
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
          type: 'png'
        });
        
        console.log(`    ✅ Сохранен: ${screenshotPath}`);
        
      } catch (error) {
        console.log(`    ❌ Ошибка для ${pageConfig.url}: ${error.message}`);
      }
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
  for (const pageConfig of pages) {
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
  for (const pageConfig of pages) {
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