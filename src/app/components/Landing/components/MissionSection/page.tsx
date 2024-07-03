import React from "react";

interface SectionProps {
  title: string;
  description: string;
}

const TextSection: React.FC<SectionProps> = ({ title, description }) => {
  return (
    <div
      className={`px-4 flex justify-center items-center ct-md:items-start bg-cryptoTask-black text-dark w-full h-[100vh] ct-md:h-fit pb-0 ct-md:pb-[200px]`}
    >
      <div className="flex flex-col items-center font-cryptoTask-regular">
        <div className={`w-full max-w-[900px]`}>
          <h2
            className={`text-cryptoTask-banner-header-mobile ct-md:text-cryptoTask-banner-header font-bold mb-4 text-cryptoTask-orange`}
          >
            {title}
          </h2>
          <p className={`text-lg mb-4 text-justify text-cryptoTask-dark-white`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
