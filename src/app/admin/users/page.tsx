'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import DesktopUsers from '@/components/admin/users/DesktopUsers';

const MobileUsers = dynamic(() => import('@/components/admin/users/MobileUsers'), { ssr: false });

export default function UsersPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  if (isMobile) return <MobileUsers />;
  return <DesktopUsers />;
}
