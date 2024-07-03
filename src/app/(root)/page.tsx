"use client";
import RootLayout from "./layout";
import Landing from "../components/Landing/page";
import Navbar from "../components/AppBar/page";

export default function Home() {
  return (
    <RootLayout>
      <main>
        <Navbar />
        <Landing />
      </main>
    </RootLayout>
  );
}
