'use client';

import React, { useState } from 'react';
import { BarcodeScanner } from '@/components/BarcodeScanner';
import { LetterList } from '@/components/LetterList';
import { AddLetterForm } from '@/components/AddLetterForm';

export default function Home(): React.ReactElement {
  const [isScanning, setIsScanning] = useState(false);
  const [roomNumber, setRoomNumber] = useState<string>('');

  const handleScan = (decodedText: string): void => {
    setRoomNumber(decodedText);
    setIsScanning(false);
  };

  const handleError = (error: string): void => {
    console.error('Ошибка сканирования:', error);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Управление письмами</h1>
          <p className="mt-2 text-gray-600">Система учета писем для лагеря</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Форма добавления письма */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Добавить письмо</h2>
            <AddLetterForm onRoomNumberChange={setRoomNumber} />
          </div>

          {/* Сканер штрих-кодов */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Сканировать код комнаты</h2>
            <div className="space-y-4">
              {!isScanning ? (
                <button
                  onClick={() => setIsScanning(true)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Начать сканирование
                </button>
              ) : (
                <div>
                  <BarcodeScanner onScan={handleScan} onError={handleError} />
                  <button
                    onClick={() => setIsScanning(false)}
                    className="w-full mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Отменить
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Список писем */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Письма</h2>
          <LetterList roomNumber={roomNumber} />
        </div>
      </div>
    </main>
  );
}
