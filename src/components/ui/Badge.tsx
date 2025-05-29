import React from 'react';

interface BadgeProps {
  color?: 'red' | 'green' | 'gray';
  children: React.ReactNode;
  className?: string;
}

const colorMap = {
  red: 'bg-red-100 text-red-700 border border-red-200',
  green: 'bg-green-100 text-green-700 border border-green-200',
  gray: 'bg-gray-100 text-gray-500 border border-gray-200',
};

export const Badge: React.FC<BadgeProps> = ({ color = 'gray', children, className = '' }) => (
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${colorMap[color]} ${className}`}
  >
    {children}
  </span>
);
