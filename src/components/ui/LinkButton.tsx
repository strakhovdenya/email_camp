import * as React from 'react';
import NextLink from 'next/link';
import Button, { ButtonProps } from '@mui/material/Button';
import { cn } from '@/lib/utils';

export interface LinkButtonProps extends Omit<ButtonProps, 'href'> {
  href: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title?: string;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ children, className, leftIcon, rightIcon, title, href, ...props }, ref) => (
    <Button
      ref={ref}
      component={NextLink}
      href={href}
      className={cn('rounded-full font-semibold transition-all', className)}
      startIcon={leftIcon}
      endIcon={rightIcon}
      title={title}
      disableElevation
      {...props}
    >
      {children}
    </Button>
  )
);
LinkButton.displayName = 'LinkButton';
