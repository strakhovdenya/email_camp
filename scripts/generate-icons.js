import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Размеры иконок
const sizes = [192, 512];

// Создаем директорию для иконок, если её нет
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Функция для создания иконки
function generateIcon(size) {
  // Создаем canvas нужного размера
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Фон
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(0, 0, size, size);

  // Конверт (прямоугольник)
  const padding = size * 0.25;
  const width = size - (padding * 2);
  const height = width * 0.875;
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size * 0.0625;
  ctx.lineJoin = 'round';
  
  // Рисуем конверт
  ctx.beginPath();
  ctx.roundRect(padding, padding, width, height, size * 0.03125);
  ctx.stroke();

  // Линия конверта
  const startX = padding;
  const startY = padding + (height * 0.3);
  const middleX = size / 2;
  const middleY = padding + (height * 0.6);
  const endX = padding + width;
  const endY = startY;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(middleX, middleY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Сохраняем файл
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(
    path.join(iconsDir, `icon-${size}x${size}.png`),
    buffer
  );
}

// Генерируем иконки всех размеров
sizes.forEach(size => generateIcon(size));

console.log('Icons generated successfully!'); 