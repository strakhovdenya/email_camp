import React from 'react';
import Link from 'next/link';

export default function AdminWelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-100 text-blue-600 text-5xl shadow mb-6">
        <span role="img" aria-label="admin">
          🛡️
        </span>
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
        Добро пожаловать в админ-панель
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
        Здесь вы можете управлять пользователями, комнатами и письмами, а также просматривать и
        настраивать уведомления. Выберите нужный раздел для начала работы.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-lg"
        >
          <span role="img" aria-label="users">
            👥
          </span>{' '}
          Пользователи
        </Link>
        <Link
          href="/admin/rooms"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition text-lg"
        >
          <span role="img" aria-label="rooms">
            🏠
          </span>{' '}
          Комнаты
        </Link>
        <Link
          href="/admin/letters"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition text-lg"
        >
          <span role="img" aria-label="letters">
            ✉️
          </span>{' '}
          Письма
        </Link>
      </div>
    </div>
  );
}
