"use client";

import Footer from "../Footer/page";
import Section from "./components/Section/page";
import BannerSection from "./components/BannerSection/page";
import MissionSection from "./components/MissionSection/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProcessSection from "./components/ProcessSection/page";

export default function Landing() {
  const router = useRouter();
  // useEffect(() => {
  //   if (localStorage.getItem("auth_token")) {
  //     router.push("/home");
  //   }
  // }, [localStorage]);
  return (
    <div>
      <BannerSection
        title="Welcome to CryptoTask"
        description="CryptoTask allows you to register your GitHub repositories and offer bounties for tasks. Developers can solve tasks and claim rewards directly to their Solana accounts on a successful PR merge."
        imgSrc={"/bannerEarth.jpg"} // Replace with your actual image path
        type="banner"
      />
      <MissionSection
        title="Our Mission"
        description="We strive to provide a platform for developers to earn money by solving tasks and for project owners to get their projects completed faster. We aim to provide a seamless experience for both parties by leveraging the Solana blockchain for fast and secure transactions. We aim to transfer the power of the gig economy to the blockchain and redfine the (broken) hiring process for developers."
      />
      <ProcessSection />
      <Footer />
    </div>
  );
}
