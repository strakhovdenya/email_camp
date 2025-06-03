import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/users', label: 'Пользователи', icon: '👥' },
  { href: '/admin/rooms', label: 'Комнаты', icon: '🏠' },
  { href: '/admin/letters', label: 'Письма', icon: '✉️' },
];

const MobileAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Если это welcome-страница, не показываем меню и заголовок
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
      </header>
      <main className="flex-1 px-2 py-2">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 z-30 shadow">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full text-xs font-medium transition-colors
              ${pathname === item.href ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileAdminLayout;
