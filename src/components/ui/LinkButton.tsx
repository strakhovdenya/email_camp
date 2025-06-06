import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

export interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  title?: string;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ children, className, leftIcon, title, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn(
        'inline-flex items-center px-4 py-2 rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition',
        className
      )}
      title={title}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </Link>
  )
);
LinkButton.displayName = 'LinkButton';
