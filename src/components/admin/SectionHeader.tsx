import React from 'react';

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 mb-6">
    {icon && (
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 text-2xl shadow-sm">
        {icon}
      </div>
    )}
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        {title}
      </h2>
      {description && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{description}</p>
      )}
    </div>
  </div>
);

export default SectionHeader;
