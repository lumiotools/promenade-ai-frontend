"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import SeaarchV1 from "../public/icons/Search-var1.png";
import SeaarchV2 from "../public/icons/Search-var2.png";
import SeaarchV3 from "../public/icons/Search-var3.png";
import SeaarchV4 from "../public/icons/Search-var4.png";

interface LoadingCardProps {
  companyName: string;
  onBack: () => void;
}

export function LoadingCard({ companyName, onBack }: LoadingCardProps) {
  const images = [SeaarchV1, SeaarchV2, SeaarchV3, SeaarchV4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-white rounded-2xl w-full max-w-[560px] p-12 text-center shadow-lg border">
      <div className="w-16 h-16 mx-auto mb-6">
        <Image
          src={images[currentImageIndex]}
          alt=""
          className="w-16 h-16 object-contain"
        />
      </div>

      <h2 className="text-[22px] font-semibold text-gray-900 mb-1">
        Fetching Company Profile of {companyName}
      </h2>

      <p className="text-base text-gray-600 mb-3">
        Checking all trusted data sources
      </p>

      <div className="flex gap-2 justify-center mb-6">
        <div className="w-2 h-2 rounded-full bg-[#7F56D9] animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-[#7F56D9] animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-[#7F56D9] animate-bounce" />
      </div>

      <p className="text-sm text-gray-600 mb-8 max-w-[400px] mx-auto">
        This Process might take some time, but the wait will be worth it! You
        can close this window or make another request. We&apos;ll email you once
        the results are ready.
      </p>

      <button
        onClick={onBack}
        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#7F56D9] hover:bg-[#6941C6] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>
    </div>
  );
}
