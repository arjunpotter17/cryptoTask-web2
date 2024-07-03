"use client";
import RootLayout from "../layout";
import Navbar from "../../components/AppBar/page";
import ProfileComponent from "./profile";
import Footer from "@/app/components/Footer/page";

export default function Home() {
  return (
    <RootLayout>
      <main className="bg-cryptoTask-dark-white h-full">
        <Navbar />
        <div
          className="mt-[72px] flex-grow w-full px-4 flex justify-center "
          style={{ minHeight: "calc(100vh - 72px - 72px)" }}
        >
          <ProfileComponent />
        </div>
        <Footer />
      </main>
    </RootLayout>
  );
}
