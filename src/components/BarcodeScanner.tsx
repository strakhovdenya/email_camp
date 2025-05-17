import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

// Component for scanning barcodes and QR codes
interface BarcodeScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (error: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  onError,
}): React.ReactElement => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    if (!containerRef.current) return () => {};

    const containerId = 'barcode-scanner';
    containerRef.current.id = containerId;

    scannerRef.current = new Html5Qrcode(containerId);

    const constraints = {
      facingMode: { ideal: 'environment' },
    };

    void scannerRef.current
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
        },
      )
      .catch((err: Error) => {
        onError?.(err.message || 'Failed to start scanner');
      });

    return (): void => {
      if (scannerRef.current) {
        void scannerRef.current.stop().catch((err: Error) => {
          console.error('Failed to stop scanner:', err);
        });
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
