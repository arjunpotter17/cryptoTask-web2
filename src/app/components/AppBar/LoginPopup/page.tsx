"use client";
import { CloseIcon } from "@/app/Icons/closeIcon";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import GitHubLoginButton from "../GithubLoginButton/page";
import { useRouter, useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import Cookies from "js-cookie";

interface PopupProps {
  onClose: () => void;
  acceptFunction: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose, acceptFunction }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const router = useRouter();

  // const { publicKey, signMessage } = useWallet();

  // const params = useSearchParams();

  // const client_id = "Ov23likV0TjRpwy5b8WJ";

  // const signSignature = async () => {
  //   const message = new TextEncoder().encode("prove your worth to cryptoTask!");
  //   const signature = await signMessage?.(message);

  //   try {
  //     const result = await axios.post(`http://localhost:3005/v1/user/signin`, {
  //       signature,
  //       publicKey,
  //     });
  //     const token = result.data.token;
  //     localStorage.setItem("wallet_token", JSON.stringify(token));
  //   } catch {
  //     console.log("could not get the github token");
  //   }
  // };

  useEffect(() => {
    // Trigger the opening animation after the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10); // Small delay to apply the opening animation

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (publicKey) signSignature();
  // }, [publicKey]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 500); // Duration of the closing animation
  };

  console.log("entered the final boss");

  return (
    <>
      {isAnimating && (
        <div
          className={`!z-50 border border-red-500 fixed inset-0 flex items-center justify-center bg-cryptoTask-popup-bg bg-opacity-65 transition-opacity duration-500 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`flex flex-col bg-black shadow-lg w-full max-w-lg mx-4 sm:mx-auto transform transition-transform duration-500 ease-in-out pb-10 ${
              isVisible ? "scale-100" : "scale-50"
            }`}
          >
            <button onClick={handleClose} className="self-end">
              <CloseIcon color="#A04000" />
            </button>
            <div className="text-gray-300  mx-4">
              <h2 className="text-cryptoTask-title md:text-cryptoTask-title font-cryptoTask-semibold text-cryptoTask-white">
                Redirecting to github
              </h2>
              <p className="text-cryptoTask-subtitle-mobile font-cryptoTask-regular ct-md:text-cryptoTask-subtitle">
                You'll need to install our github app so that we can create
                issues/PRs/and monitor them on your selected repositories
              </p>
              <div className="flex flex-col ct-md:flex-row ct-md:justify-center items-center mt-10 ct-md:gap-x-4 gap-y-4">
                <button onClick={() => acceptFunction()}>
                  You have my trust
                </button>
                <button onClick={() => handleClose()}>Too soon</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
