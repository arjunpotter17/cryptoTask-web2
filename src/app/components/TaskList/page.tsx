import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLink } from "@/app/Icons/linkArrow";

type Escrow = {
  title: string;
  description: string;
  done: boolean;
  id: number;
  url: string;
  amount: number;
  createdAt: string; // Assuming createdAt field contains the timestamp
};

const EscrowsList = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Escrow[]>([]);

  const getTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/v1/user/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Function to calculate human-readable time ago
  const timeAgo = (date: string) => {
    const now = new Date();
    const pastDate = new Date(date);
    const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} year${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 60);
    return `${interval} minute${interval > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="w-full h-full flex flex-col pt-4">
      <h1 className="text-cryptoTask-title-mobile md:text-cryptoTask-title font-cryptoTask-bold text-cryptoTask-black">
        Task List
      </h1>
      <ul className="flex flex-col w-full ct-lg:max-w-[1050px] self-center text-cryptoTask-black font-cryptoTask-regular">
        {tasks.map((escrow) => (
          <li
            key={escrow.id}
            onClick={() => router.push(escrow.url)}
            className={`my-4 p-4 border flex justify-between cursor-pointer border-cryptoTask-black hover:border-cryptoTask-dark-orange rounded-sm transition-all duration-300 ease-in-out hover:scale-95 hover:bg-cryptoTask-black hover:text-cryptoTask-orange`}
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-cryptoTask-bold">{escrow.title}</h2>
              <p>{escrow.description}</p>
              <p>Status: {escrow.done ? "Completed" : "Pending"}</p>
              <p>Reward: {escrow.amount}</p>
              <p>Created: {timeAgo(escrow.createdAt)}</p>
            </div>
            <ArrowLink />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EscrowsList;
