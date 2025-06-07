import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Eye } from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { motion, AnimatePresence } from 'framer-motion';

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
  maxSizeMB = 10,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setError('Можно загружать только изображения');
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Максимальный размер файла — ${maxSizeMB} МБ`);
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
    if (!previewUrl) inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 shadow-sm relative select-none
          ${dragActive ? 'border-blue-500 bg-blue-50 scale-[1.03]' : 'border-gray-200 bg-white'}
          ${previewUrl ? 'opacity-60 pointer-events-none' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        tabIndex={0}
        role="button"
        aria-label="Загрузить фото"
        whileTap={{ scale: 0.97 }}
      >
        {!previewUrl && (
          <>
            <Upload className="w-10 h-10 text-blue-400 mb-2" strokeWidth={2.2} />
            <span className="text-gray-700 text-sm text-center font-medium">
              Перетащите фото, <span className="underline">выберите файл</span> или{' '}
              <span className="underline">сделайте снимок</span>
              <br />
              <span className="text-xs text-gray-400">(jpg, png, webp, до {maxSizeMB} МБ)</span>
            </span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleInputChange}
          tabIndex={-1}
        />
      </motion.div>
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            className="relative mt-2 flex flex-col items-center w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative w-full max-w-xs aspect-square rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
              <Image
                src={previewUrl}
                alt="Превью фото"
                fill
                className="object-contain"
                style={{ background: '#f8fafc' }}
                sizes="(max-width: 600px) 100vw, 200px"
                priority
                onClick={() => setModalOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Открыть фото в модальном окне"
              />
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                {onRemove && (
                  <Tooltip title="Удалить фото">
                    <IconButton
                      onClick={onRemove}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.85)',
                        '&:hover': { bgcolor: 'rgba(255,0,0,0.12)' },
                      }}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Открыть фото">
                  <IconButton
                    onClick={() => setModalOpen(true)}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.85)',
                      '&:hover': { bgcolor: 'rgba(59,130,246,0.12)' },
                    }}
                  >
                    <Eye className="w-5 h-5 text-blue-500" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <Dialog
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              maxWidth="md"
              fullWidth
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  bgcolor: 'transparent',
                  overflow: 'hidden',
                },
              }}
              BackdropProps={{
                sx: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={previewUrl}
                  alt="Фото письма"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            </Dialog>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.div
            className="text-red-500 text-xs text-center mt-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
