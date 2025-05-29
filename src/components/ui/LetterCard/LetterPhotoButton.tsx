import React from 'react';

export const LetterPhotoButton: React.FC<{ url: string }> = ({ url }) => (
  <button
    type="button"
    className="text-blue-500 hover:text-blue-700"
    title="View photo"
    onClick={() => window.open(url, '_blank')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 inline"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5l5.25-5.25a2.25 2.25 0 013.18 0l5.25 5.25"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  </button>
);
