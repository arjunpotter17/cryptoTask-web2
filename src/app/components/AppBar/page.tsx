"use client";
import React, { useEffect, useState } from "react";
import { transition } from "../../constants/transition";
import "@solana/wallet-adapter-react-ui/styles.css";
import { usePermissionModal } from "../../hooks/loginModal";
import Popup from "./LoginPopup/page";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { ProfileHeaderIcon } from "@/app/Icons/profileIcon";
import Spinner from "../Spinner/page";
import { useAuth } from "@/app/hooks/useLocalStorage";
import { getProgramData } from "@/app/utils/smartContract";

const Navbar = () => {
  const { permissionModal, setPermissionModal } = usePermissionModal();
  const [loader, setLoader] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const { token, setToken } = useAuth();
  getProgramData();
  // const { publicKey, signMessage } = useWallet();

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
  //     router.push('/home')
  //   } catch {
  //     console.log("Your signature is not worthy, Get stronger!");
  //   }
  // };

  // useEffect(() => {
  //   if (publicKey) signSignature();
  // }, [publicKey]);

  const githubAuth = async () => {
    const code = params.get("code");
    try {
      const result = await axios.post(
        `http://localhost:3005/v1/user/githubAuthToken?code=${code}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result.data.token);
      if (result.data.token) {
        window.localStorage.setItem("auth_token", result.data.token);
        setToken(result.data.token);
        router.push("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const githubAppAuth = async () => {
    const code = params.get("code");
    const installation_id = params.get("installation_id");
    const setup_action = params.get("setup_action");
    try {
      const result = await axios.get(
        `http://localhost:3005/v1/user/app-installation?code=${code}&installation_id=${installation_id}&setup_action=${setup_action}`,

        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
            Accept: "application/json",
          },
        }
      );

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      params.get("code") &&
      params.get("installation_id") &&
      params.get("setup_action")
    ) {
      githubAppAuth();
    }
    if (params.get("code") && !token) {
      githubAuth();
    }
  }, [params]);

  const handleGithubLogin = async () => {
    if (token) {
      const res = await axios.get(
        `http://localhost:3005/v1/user/app-installation-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
            Accept: "application/json",
          },
        }
      );
      setLoader(false);
      if (res.data.status === "false") setPermissionModal(true);
      else router.push("/task");
      return;
    }
    const client_id = "Ov23likV0TjRpwy5b8WJ";
    const scope = "user%20repo";
    setLoader(false);
    router.push(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`
    );
  };

  return (
    <nav className="bg-cryptoTask-black fixed top-0 flex items-center justify-center w-full px-4 shadow-md h-[72px] !z-50">
      <div className="flex justify-between !w-full items-center">
        <div className="text-2xl font-bold text-cryptoTask-orange font-cryptoTask-regular">
          CryptoTask
        </div>
        <div className="flex items-center gap-x-4">
          {
            <button
              onClick={() => {
                setLoader(true);
                handleGithubLogin();
              }}
              className={`bg-cryptoTask-orange text-cryptoTask-white hover:text-cryptoTask-dark-white hover:bg-cryptoTask-dark-orange font-cryptoTask-regular px-5 py-1.5 rounded-sm ${transition} w-[145px]`}
            >
              {loader ? (
                <Spinner color="#fff" size={25} />
              ) : !token ? (
                "Github Login"
              ) : (
                "Create a Task"
              )}
            </button>
          }
          {token && (
            <button
              className="cursor-pointer"
              onClick={() => {
                router.push("/profile");
              }}
            >
              <ProfileHeaderIcon color="#fff" size="24" />
            </button>
          )}
          {permissionModal && (
            <Popup
              onClose={setPermissionModal}
              acceptFunction={() =>
                router.push(`https://github.com/apps/cryptotask-monitor`)
              }
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
