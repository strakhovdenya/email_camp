const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Импортируем конфигурацию из основного скрипта
const { execSync } = require('child_process');

// Функция для проверки доступности сервера
async function checkServer(url = 'http://localhost:3000', maxRetries = 5) {
  const { chromium } = require('playwright');
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(url, { timeout: 5000 });
      await browser.close();
      console.log('✅ Сервер доступен');
      return true;
    } catch (error) {
      console.log(`⏳ Попытка ${i + 1}/${maxRetries}: сервер недоступен, жду...`);
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
  
  console.log('❌ Сервер не отвечает. Убедитесь что приложение запущено на http://localhost:3000');
  return false;
}

// Функция для создания скриншотов только определенных страниц
async function updateSpecificPages(pageNames = []) {
  console.log('🔄 Обновление скриншотов...\n');
  
  // Проверяем доступность сервера
  const serverAvailable = await checkServer();
  if (!serverAvailable) {
    console.log('\n💡 Запустите приложение командой: npm run dev');
    return;
  }
  
  // Запускаем основной скрипт
  try {
    if (pageNames.length > 0) {
      console.log(`📸 Обновляю скриншоты для страниц: ${pageNames.join(', ')}`);
      // Можно добавить логику для обновления только определенных страниц
    }
    
    execSync('node scripts/take-screenshots.cjs', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    console.log('\n✨ Обновление завершено!');
    console.log('\n📋 Следующие шаги:');
    console.log('1. Проверьте новые скриншоты в public/images/gallery/');
    console.log('2. Скопируйте содержимое scripts/gallery-config.json');
    console.log('3. Обновите src/app/showcase/gallery/page.tsx');
    
  } catch (error) {
    console.error('❌ Ошибка при создании скриншотов:', error.message);
  }
}

// Функция для автоматического обновления галереи
async function updateGallery() {
  console.log('🎨 Обновляю галерею...');
  
  try {
    const configPath = path.join(__dirname, 'gallery-config.json');
    const galleryPath = path.join(__dirname, '..', 'src', 'app', 'showcase', 'gallery', 'page.tsx');
    
    if (!fs.existsSync(configPath)) {
      console.log('❌ Файл gallery-config.json не найден. Сначала создайте скриншоты.');
      return;
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const galleryContent = fs.readFileSync(galleryPath, 'utf8');
    
    // Ищем массив galleryItems и заменяем его
    const newContent = galleryContent.replace(
      /const galleryItems: GalleryItem\[\] = \[[\s\S]*?\];/,
      `const galleryItems: GalleryItem[] = ${JSON.stringify(config, null, 2)};`
    );
    
    fs.writeFileSync(galleryPath, newContent);
    console.log('✅ Галерея обновлена автоматически!');
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении галереи:', error.message);
    console.log('📋 Обновите галерею вручную, скопировав содержимое scripts/gallery-config.json');
  }
}

// Обработка аргументов командной строки
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  switch (command) {
    case 'check':
      await checkServer();
      break;
    case 'gallery':
      await updateGallery();
      break;
    case 'all':
      await updateSpecificPages();
      await updateGallery();
      break;
    default:
      await updateSpecificPages();
      break;
  }
}

main().catch(console.error); 