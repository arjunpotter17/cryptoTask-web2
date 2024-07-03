"use client";
import React from "react";

interface GitHubLoginButtonProps {
  onClick: () => void;
}

const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-cryptoTask-orange hover:bg-cryptoTask-dark-orange text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 max-h-[54px]"
    >
      Login with GitHub
    </button>
  );
};

export default GitHubLoginButton;
