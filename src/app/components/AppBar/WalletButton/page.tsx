import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface SolanaWalletButtonProps {
  onClick: () => void; // Define onClick handler if needed
}

const SolanaWalletButton: React.FC<SolanaWalletButtonProps> = ({ onClick }) => {
  return <WalletMultiButton onClick={onClick} />;
};

export default SolanaWalletButton;
