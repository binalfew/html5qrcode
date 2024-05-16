import { Html5QrcodeResult } from "html5-qrcode";
import React, { useState } from "react";
import "./App.css";
import BarcodeScanner from "./BarcodeScanner";

const App: React.FC = () => {
  const [decodedText, setDecodedText] = useState<string>("");

  const handleScanSuccess = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    console.log(`Decoded text: ${decodedText}`, decodedResult);
    setDecodedText(decodedText);
  };

  const handleScanFailure = (error: string) => {
    console.warn(`Scan failed: ${error}`);
  };

  return (
    <div className="app">
      <div className="scanner-container">
        <h1>Barcode Scanner</h1>
        <BarcodeScanner
          onScanSuccess={handleScanSuccess}
          onScanFailure={handleScanFailure}
        />
        <input
          type="text"
          value={decodedText}
          readOnly
          className="scan-result"
        />
      </div>
    </div>
  );
};

export default App;
