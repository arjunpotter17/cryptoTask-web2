import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/app/hooks/useLocalStorage";
import Spinner from "@/app/components/Spinner/page";
import { createEscrow, closeEscrow } from "../../utils/smartContract";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import sha256 from "crypto-js/sha256";

type Repository = {
  id: number;
  full_name: string;
  owner: {
    login: string;
  };
  name: string;
};

const TaskComponent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [amount, setAmount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [customDate, setCustomDate] = useState("");
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const { publicKey, signTransaction, connect } = useWallet();

  useEffect(() => {
    const fetchRepos = async () => {
      if (!token) return;
      try {
        const response = await axios.post(
          "http://localhost:3005/v1/user/github-repos",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { userRepos, orgRepos } = response.data;
        setRepos([...userRepos, ...orgRepos]);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, [token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleExpiryChange = (days: number) => {
    const now = new Date();
    now.setDate(now.getDate() + days);
    const userTimezoneOffset = now.getTimezoneOffset() * 60000;
    const expiryLocalTime = new Date(now.getTime() - userTimezoneOffset);
    const expiryLocalISOString = expiryLocalTime.toISOString().slice(0, 16);
    setExpiry(expiryLocalTime.toISOString());
    setCustomDate(expiryLocalISOString);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const customDateLocalTime = new Date(date.getTime() - userTimezoneOffset);
    const customDateLocalISOString = customDateLocalTime
      .toISOString()
      .slice(0, 16);
    setCustomDate(customDateLocalISOString);
    setExpiry(customDateLocalTime.toISOString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!publicKey || !signTransaction) {
        await connect();
        if (!publicKey || !signTransaction) {
          throw new Error("Wallet connection failed");
        }
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("repo", selectedRepo);
      formData.append("amount", amount);
      formData.append("expiry", expiry);
      if (image) {
        formData.append("image", image);
      }

      const amountNumber = parseFloat(amount);
      const keyword = title; // Example keyword, replace with actual keyword if needed
      const hash = Buffer.from(sha256(keyword).toString(), "hex");

      const data = await createEscrow(
        amountNumber,

        hash
      );

      console.log(data);

      return;

      const response = await axios.post(
        "http://localhost:3005/v1/user/create-issue",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert(`Issue created: ${response.data.issueUrl}`);
    } catch (error) {
      console.error("Error creating issue:", error);
      alert("Error creating issue");
      if (!signTransaction) return;
      try {
        // await closeEscrow(
        //   title,
        //   VAULT_PUBLIC_KEY,
        //   ESCROW_PUBLIC_KEY,
        //   signTransaction
        // );
      } catch (closeError) {
        console.error("Error closing escrow:", closeError);
      }
    } finally {
      setLoading(false);
    }
  };

  function connectWallet() {
    (async () => {
      try {
        const resp = await window.solana.connect();
        console.log(resp);
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    })();
    // window.solana.on("connect", () => document.getElementById("status").innerText="Connected")
  }

  return repos?.length !== 0 ? (
    <div className="w-full lg:max-w-[900px] mx-auto font-cryptoTask-regular my-10">
      <h1 className="text-2xl font-cryptoTask-semibold mb-5">Create Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="repo" className="block text-sm font-medium">
            Choose a repository
          </label>
          <select
            id="repo"
            value={selectedRepo}
            onChange={(e) => setSelectedRepo(e.target.value)}
            className="mb-4 p-2 border"
          >
            <option value="">Select a repository</option>
            {repos.map((repo) => (
              <option key={repo.id} value={`${repo.owner.login}/${repo.name}`}>
                {repo.full_name}
              </option>
            ))}
          </select>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium">Task Expiry</label>
          <div className="flex space-x-2 mt-3 mb-1">
            <button
              type="button"
              onClick={() => handleExpiryChange(1)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              1 Day
            </button>
            <button
              type="button"
              onClick={() => handleExpiryChange(3)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              3 Days
            </button>
            <button
              type="button"
              onClick={() => handleExpiryChange(7)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              7 Days
            </button>
          </div>
          <input
            type="datetime-local"
            value={customDate}
            onChange={handleCustomDateChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="image" className="block text-sm font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
        <WalletMultiButton />
        {publicKey && (
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? <Spinner color="#fff" size={25} /> : "Create Task"}
            </button>
          </div>
        )}
      </form>
    </div>
  ) : (
    <p>Loading</p>
  );
};

export default TaskComponent;
