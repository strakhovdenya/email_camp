'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/users', label: 'Пользователи', icon: '👥' },
  { href: '/admin/rooms', label: 'Комнаты', icon: '🏠' },
  { href: '/admin/letters', label: 'Письма', icon: '✉️' },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Если это welcome-страница, не показываем меню и заголовок
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Panel</h1>
          <nav className="mt-6">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                    ${
                      pathname === item.href
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
