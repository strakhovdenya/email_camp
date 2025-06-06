'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import dynamic from 'next/dynamic';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import { useWindowSize } from '@/hooks/useWindowSize';

const MobileAdminLayout = dynamic(() => import('@/components/admin/MobileAdminLayout'), {
  ssr: false,
});

export function AdminLayoutSwitcher({ children }: { children: React.ReactNode }) {
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_BREAKPOINT;
  if (isMobile) return <MobileAdminLayout>{children}</MobileAdminLayout>;
  return <AdminLayout>{children}</AdminLayout>;
}
