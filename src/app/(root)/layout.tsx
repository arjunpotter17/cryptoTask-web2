"use client";
import "../globals.css";
import React, { useEffect, useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletConnectButton,
  WalletDisconnectButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

import { PopupProvider } from "../hooks/loginModal";
import { useRouter } from "next/navigation";
import { AuthProvider } from "../hooks/useLocalStorage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("auth_token")) {
        router.push("/");
      }
    }
  }, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <AuthProvider>
            <PopupProvider>{children}</PopupProvider>
          </AuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
