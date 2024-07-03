import React from "react";

interface SectionProps {
  title: string;
  description: string;
  reverse?: boolean;
  imgSrc: string;
  type?: "banner" | "default";
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  reverse = false,
  imgSrc,
  type = "default",
}) => {
  return (
    <div
      className={`py-16 border border-red-500 ${
        reverse ? "bg-cryptoTask-black" : "bg-white"
      } text-dark h-[100vh]`}
    >
      <div className="container mx-auto flex flex-col items-center font-cryptoTask-regular">
        <div className={`w-full md:w-1/2 ${reverse ? "md:order-2" : ""}`}>
          <h2
            className={`text-cryptoTask-banner-header-mobile ct-md:text-cryptoTask-banner-header ${
              reverse ? "text-cryptoTask-dark-white" : ""
            } font-bold mb-4`}
          >
            {title}
          </h2>
          <p
            className={`text-lg mb-4 text-justify ${
              reverse ? "text-cryptoTask-dark-white" : ""
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
