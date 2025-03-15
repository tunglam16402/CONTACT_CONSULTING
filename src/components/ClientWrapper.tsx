"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { type ReactNode } from "react";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Kiểm tra xem đã load lần đầu chưa
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsFirstVisit(false);
      setIsLoading(false);
    } else {
      // Nếu là lần đầu, đợi 3 giây rồi ẩn loading
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Xử lý scroll position
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }, 100);
    }
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isFirstVisit && isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
