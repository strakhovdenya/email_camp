'use client';

import { usePathname } from 'next/navigation';
import UserInfo from './UserInfo';

export default function ConditionalUserInfo() {
  const pathname = usePathname();
  
  // Не показываем UserInfo на showcase страницах
  if (pathname?.startsWith('/showcase')) {
    return null;
  }
  
  return (
    <header>
      <UserInfo />
    </header>
  );
} 