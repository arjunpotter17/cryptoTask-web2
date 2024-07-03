import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import styles from "./back.module.scss";

interface Props {
  text?: string;
  url?: string;
}

const NavigationBack = ({ text = "Back", url }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.push(url || "/home")}
        className="flex text-base font-kimo-bold items-center transition duration-100 ease-in-out hover:scale-105"
      >
        <i className={"self-center"}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 19H15.83L21.42 13.41L20 12L12 20L20 28L21.41 26.59L15.83 21H28V19Z"
              fill="#fff"
            />
          </svg>
        </i>
        <span>{text}</span>
      </button>
    </>
  );
};

export default NavigationBack;
