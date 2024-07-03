"use client";
import { useRouter, useSearchParams } from "next/navigation";
import EscrowsList from "@/app/components/TaskList/page";

export default function HomeComponent() {
  //   const { data: user, error: userError } = useSWR("", fetchWithToken);
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div className="w-full">
      <EscrowsList />
    </div>
  );
}
