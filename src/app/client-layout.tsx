"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { darkMode, setDarkMode } = useAppStore();

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? JSON.parse(saved) : prefersDark;
    setDarkMode(initial);
  }, [setDarkMode]);

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
