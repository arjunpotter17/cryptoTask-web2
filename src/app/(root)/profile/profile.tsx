// src/Profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { transition } from "@/app/constants/transition";

interface Task {
  id: number;
  title: string;
  description: string;
  claimed: boolean;
  url?: string;
}

interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
  createdTasks: Task[];
  completedTasks: Task[];
  totalRedeemed: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(
        "http://localhost:3005/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setProfile(response.data);
    };

    fetchProfile();
  }, []);

  const handleClaim = async (taskId: number) => {
    await axios.post(
      "/api/claim-bounty",
      { taskId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    // Refresh the profile data
    const response = await axios.get("http://localhost:3005/v1/user/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setProfile(response.data);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col lg:max-w-[900px] mt-10 mx-auto font-cryptoTask-regular gap-y-10 mb-24">
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-6">
          <img
            src={profile.avatarUrl}
            alt="GitHub Avatar"
            className="rounded-full w-24 h-24 mr-4"
          />
          <div>
            <h2 className="text-2xl font-cryptoTask-bold">{profile.name}</h2>
            <p className="font-cryptoTask-semibold">{profile.email}</p>
          </div>
        </div>
        <button
          className={`bg-cryptoTask-orange text-cryptoTask-white hover:text-cryptoTask-white hover:bg-cryptoTask-black font-cryptoTask-regular px-5 py-1.5 rounded-sm ${transition}`}
        >
          Connect Wallet
        </button>
      </div>

      <div>
        <h3 className="text-cryptoTask-subtitle-mobile font-cryptoTask-semibold mb-4">
          Created Bounties
        </h3>
        <ul className="space-y-4">
          {profile.createdTasks.map((task) => (
            <li
              onClick={() => router.push(`${task.url}`)}
              key={task.id}
              className="p-4 cursor-pointer hover:border-cryptoTask-orange border rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-cryptoTask-semibold">
                  {task.title}
                </h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {profile.completedTasks.length > 0 && (
        <div>
          <h3 className="text-cryptoTask-subtitle-mobile font-semibold mb-4">
            Completed Bounties
          </h3>
          <ul className="space-y-4">
            {profile.completedTasks.map((task) => (
              <li
                key={task.id}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{task.title}</h4>
                  {
                    <button
                      onClick={() => handleClaim(task.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                      Claim Bounty
                    </button>
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6 flex flex-col">
        <h3 className="text-cryptoTask-subtitle-mobile font-semibold">
          Total Amount Redeemed
        </h3>
        <p className="text-lg">{profile.totalRedeemed} sol</p>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("auth_token");
          router.push("/");
        }}
        className={`bg-cryptoTask-black max-w-[100px] border border-cryptoTask-black text-cryptoTask-white hover:text-cryptoTask-black hover:bg-transparent hover:border-cryptoTask-black font-cryptoTask-regular px-5 py-1.5 rounded-sm ${transition}`}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
