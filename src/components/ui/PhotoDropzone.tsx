import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface PhotoDropzoneProps {
  onFileAccepted: (file: File) => void;
  previewUrl?: string | null;
  onRemove?: () => void;
  maxSizeMB?: number;
}

export const PhotoDropzone: React.FC<PhotoDropzoneProps> = ({
  onFileAccepted,
  previewUrl,
  onRemove,
  maxSizeMB = 2,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setError('Only images are allowed');
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Maximum file size is ${maxSizeMB} MB`);
      return;
    }
    setError(null);
    onFileAccepted(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}
          ${previewUrl ? 'opacity-60 pointer-events-none' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        tabIndex={0}
        role="button"
        aria-label="Upload photo"
      >
        {!previewUrl && (
          <>
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75M12 21v-8m0 0l-3 3m3-3l3 3"
              />
            </svg>
            <span className="text-gray-600 text-sm text-center">
              Drag and drop a photo here or <span className="underline">click to select</span>
              <br />
              <span className="text-xs text-gray-400">(jpg, png, webp, up to {maxSizeMB} MB)</span>
            </span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
          tabIndex={-1}
        />
      </div>
      {previewUrl && (
        <div className="relative mt-2 flex flex-col items-center">
          <Image
            src={previewUrl}
            alt="Photo preview"
            width={200}
            height={200}
            className="max-h-40 rounded shadow border"
            style={{ objectFit: 'contain' }}
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 text-red-600"
              aria-label="Remove photo"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
      {error && <div className="text-red-500 text-xs text-center mt-1">{error}</div>}
    </div>
  );
};
