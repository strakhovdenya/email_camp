'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import DesktopRooms from '@/components/admin/rooms/DesktopRooms';

const MobileRooms = dynamic(() => import('@/components/admin/rooms/MobileRooms'), { ssr: false });

export default function RoomsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  if (isMobile) return <MobileRooms />;
  return <DesktopRooms />;
}
