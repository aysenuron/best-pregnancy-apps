"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function CubtaleDownloadButton({ id }: { id: string }) {
  const FALLBACK = "https://app.cubtale.com/VTch/pregnancy";
  const [link, setLink] = useState(FALLBACK);

  useEffect(() => {
    setLink(FALLBACK); 
  }, []);

  return (
    <Button asChild>
      <a id={id} href={link} target="_blank" rel="noopener noreferrer">
        Download
      </a>
    </Button>
  );
}
