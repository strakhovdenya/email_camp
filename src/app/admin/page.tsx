import React from 'react';

export default function AdminWelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-100 text-blue-600 text-5xl shadow mb-6">
        <span role="img" aria-label="admin">
          🛡️
        </span>
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Добро пожаловать в админ-панель
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Здесь вы можете управлять пользователями, комнатами и письмами, а также просматривать и
        настраивать уведомления. Выберите нужный раздел для начала работы.
      </p>
    </div>
  );
}
