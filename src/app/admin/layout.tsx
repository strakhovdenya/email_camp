'use client';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import dynamic from 'next/dynamic';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';

const MobileAdminLayout = dynamic(() => import('@/components/admin/MobileAdminLayout'), {
  ssr: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  if (isMobile) return <MobileAdminLayout>{children}</MobileAdminLayout>;
  return <AdminLayout>{children}</AdminLayout>;
}
