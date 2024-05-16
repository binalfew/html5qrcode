import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useRef } from "react";

interface BarcodeScannerProps {
  onScanSuccess: (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => void;
  onScanFailure: (error: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScanSuccess,
  onScanFailure,
}) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        divRef.current.id,
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

      scannerRef.current.render(onScanSuccess, onScanFailure);
    }

    return () => {
      scannerRef.current
        ?.clear()
        .catch((error) => console.error("Failed to clear scanner", error));
    };
  }, [onScanSuccess, onScanFailure]);

  return <div id="reader" ref={divRef} />;
};

export default BarcodeScanner;
