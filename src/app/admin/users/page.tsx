import React from 'react';
import { UsersPageClient } from '@/components/admin/users/UsersPageClient';
import { InviteAdminButton } from '@/components/admin/InviteAdminButton';

export default function UsersPage() {
  return (
    <div className="container mx-auto px-4 pt-0 pb-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Пользователи</h1>
        <InviteAdminButton />
      </div>
      <UsersPageClient />
    </div>
  );
}
