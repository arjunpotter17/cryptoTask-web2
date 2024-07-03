"use client";
import React, { useEffect, useState } from "react";
import quotes from "@/app/constants/landingQuotes";

interface SectionProps {
  title: string;
  description: string;
  reverse?: boolean;

  imgSrc: string;
  type?: "banner" | "default";
}

const BannerSection: React.FC<SectionProps> = ({}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (currentQuoteIndex < quotes.length - 1) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentQuoteIndex((prevIndex) => prevIndex + 1);
          setFade(true);
        }, 500); // Fade-out duration
      }, 2000); // Change quote every 3 seconds

      return () => clearInterval(interval);
    }
  }, [currentQuoteIndex]);

  return (
    <div
      className={`bg-cryptoTask-black h-screen mt-[72px] relative w-full px-4`}
    >
      <div className="flex flex-col gap-y-5 items-center justify-center w-full h-full px-4">
        <p className="text-white text-center text-cryptoTask-banner-header-mobile md:text-cryptoTask-banner-header">
          Welcome to <span className="text-cryptoTask-orange">CryptoTask</span>
        </p>
        <p
          className={`text-cryptoTask-white text-center transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {quotes[currentQuoteIndex]}
        </p>
      </div>
    </div>
  );
};

export default BannerSection;
