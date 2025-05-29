import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}) => {
  const content = (
    <span className="inline-flex items-center gap-2">
      {leftIcon}
      {children}
      {rightIcon}
    </span>
  );

  if (href) {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link
        href={href}
        className={`inline-flex px-4 py-2 rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${className}`}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      className={`inline-flex px-4 py-2 rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
