import React from 'react';
import Chip from '@mui/material/Chip';
import type { OverridableStringUnion } from '@mui/types';
import type { ChipPropsColorOverrides } from '@mui/material/Chip';

interface BadgeProps {
  color?: OverridableStringUnion<
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    ChipPropsColorOverrides
  >;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({
  color = 'default',
  children,
  className = '',
  icon,
  size = 'small',
}) => {
  // Only pass icon if it's a valid ReactElement (MUI Chip requires this)
  const chipIcon = React.isValidElement(icon) ? icon : undefined;
  return (
    <Chip
      label={children}
      color={color}
      icon={chipIcon}
      size={size}
      className={className}
      sx={{ fontWeight: 600, fontSize: 13, borderRadius: 9999 }}
    />
  );
};
