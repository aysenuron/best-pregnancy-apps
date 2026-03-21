"use client";
import { useEffect, useState } from "react";

export function StickyDownloadBar() {
  const FALLBACK = "https://app.cubtale.com/VTch/pregnancy";
  const [link, setLink] = useState(FALLBACK);

  useEffect(() => {
    setLink(FALLBACK);
    
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-purple-500 shadow-lg">
      <a
        href={link}
        id="cubtale-btn"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full py-4 text-white font-semibold text-lg hover:bg-purple-600 transition-colors"
      >
        🤍 Download Cubtale
      </a>
    </div>
  );
}
