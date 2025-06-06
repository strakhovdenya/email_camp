'use client';

import React, { useState, useEffect } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import DesktopRooms from './DesktopRooms';
import MobileRooms from './MobileRooms';

export function RoomsPageClient() {
  const [mounted, setMounted] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_BREAKPOINT;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ minHeight: 200 }} />;
  }

  return isMobile ? <MobileRooms /> : <DesktopRooms />;
}
