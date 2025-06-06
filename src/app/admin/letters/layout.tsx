import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function LettersLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
