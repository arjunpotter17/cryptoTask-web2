"use client";
import RootLayout from "../layout";
import Navbar from "../../components/AppBar/page";
import TaskComponent from "./task";
import Footer from "@/app/components/Footer/page";

export default function Home() {
  return (
    <RootLayout>
      <main className="bg-cryptoTask-dark-white min-h-screen flex flex-col">
        <Navbar />
        <div
          className="flex-grow flex justify-center px-4 mt-[72px]"
          style={{ minHeight: "calc(100vh - 72px - 72px)" }}
        >
          <TaskComponent />
        </div>
        <Footer />
      </main>
    </RootLayout>
  );
}
