import React, { useState, useRef } from 'react';

interface UploadDropzoneProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSize?: number; // in bytes
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function UploadDropzone({
  onUpload,
  accept = '.pdf,.png,.jpg,.jpeg',
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  className = '',
  disabled = false
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File troppo grande. Massimo ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }

    // Check file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      return `Formato non supportato. Formati accettati: ${accept}`;
    }

    return null;
  };

  const handleFiles = async (files: FileList) => {
    if (disabled || files.length === 0) return;

    setError(null);
    setIsUploading(true);

    try {
      const file = files[0]; // Take first file if not multiple
      
      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Upload file
      await onUpload(file);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante l\'upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!disabled && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`upload-dropzone ${className}`}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }
          ${isUploading ? 'pointer-events-none' : ''}
        `}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        {/* Upload icon and text */}
        <div className="space-y-4">
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Caricamento in corso...
              </p>
            </>
          ) : (
            <>
              <div className="text-4xl text-gray-400">📁</div>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {isDragging ? 'Rilascia il file qui' : 'Carica documento'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Trascina un file qui o clicca per selezionare
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Formati supportati: {accept} • Max {(maxSize / 1024 / 1024).toFixed(1)}MB
                </p>
              </div>
            </>
          )}
        </div>

        {/* Drag overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg flex items-center justify-center">
            <div className="text-blue-600 dark:text-blue-400 font-medium">
              Rilascia per caricare
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">
            ⚠️ {error}
          </p>
        </div>
      )}
    </div>
  );
}