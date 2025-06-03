import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  color?: 'primary' | 'danger' | 'default';
  children: React.ReactNode;
}

const colorMap = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  color = 'default',
  children,
  ...props
}) => (
  <button
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${colorMap[color]}`}
    {...props}
  >
    {icon && <span className="text-lg">{icon}</span>}
    {children}
  </button>
);

export default ActionButton;
