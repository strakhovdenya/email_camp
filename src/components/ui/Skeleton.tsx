import React from 'react';
import MuiSkeleton from '@mui/material/Skeleton';

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | false;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  style,
  variant = 'rectangular',
  animation = 'pulse',
}) => (
  <MuiSkeleton
    className={className}
    width={width}
    height={height}
    style={style}
    variant={variant}
    animation={animation}
    sx={{ borderRadius: variant === 'circular' ? '50%' : 8 }}
  />
);
