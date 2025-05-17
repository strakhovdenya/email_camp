import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (error: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onError }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerId = 'barcode-scanner';
    containerRef.current.id = containerId;

    scannerRef.current = new Html5Qrcode(containerId);

    const constraints = {
      facingMode: { ideal: 'environment' },
    };

    scannerRef.current
      .start(
        { facingMode: constraints.facingMode },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
        },
        (errorMessage) => {
          onError?.(errorMessage);
        }
      )
      .catch((err) => {
        onError?.(err?.message || 'Failed to start scanner');
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch((err) => console.error('Failed to stop scanner:', err));
      }
    };
  }, [onScan, onError]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        ref={containerRef}
        className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden"
      />
    </div>
  );
};
