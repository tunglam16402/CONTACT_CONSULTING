"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import gsap from "gsap";
import Image from "next/image";
import heroImage from "../../public/assets/images/banner3.jpg";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import TrainingFacilities from "@/components/sections/TrainingFacilities";
import TrainingProgram from "@/components/sections/TrainingProgram";
import Activities from "@/components/sections/Activities";
import Footer from "@/components/layout/Footer";

gsap.registerPlugin(ScrollToPlugin);

const OutstandingStudents = dynamic(
  () => import("@/components/sections/OutstandingStudents"),
  {
    ssr: false,
    loading: () => <div className="py-20 text-center">Loading...</div>,
  }
);

const usePersistScroll = () => {
  useLayoutEffect(() => {
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
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  usePersistScroll();

  // Kiểm tra session để chỉ hiện splash screen 1 lần cho mỗi phiên
  useEffect(() => {
    const splashDisplayed = sessionStorage.getItem("splashDisplayed");
    if (splashDisplayed) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("splashDisplayed", "true");
      }, 3000); // Splash hiện trong 3 giây
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1.5 }}
      >
        {/* Floating animated shapes phía background */}
        <motion.div
          className="absolute w-20 h-20 bg-white rounded-full opacity-20"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-white rounded-full opacity-30"
          style={{ top: "20%", right: "15%" }}
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-white rounded-full opacity-25"
          style={{ bottom: "15%", left: "20%" }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Centered loading content */}
        <div className="z-10 flex flex-col items-center">
          <motion.div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-4 h-4 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
          <motion.div
            className="mt-4 text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, scale: [1, 1.1, 1] }}
            transition={{
              duration: 1,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 0.5,
            }}
          >
            Loading...
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <main className="text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen overflow-hidden">
        {/* Animated Gradient Background */}
        <style jsx global>{`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, #ff0080, #7928ca, #00d2ff, #ff0080)",
            backgroundSize: "400% 400%",
            animation: "gradientAnimation 10s ease infinite",
          }}
        />
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40" />
        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <motion.div
            className="max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p
              className="mb-4 text-white text-xl drop-shadow-lg"
              variants={textVariants}
              transition={{ duration: 0.8 }}
            >
              ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI - TRƯỜNG CAO ĐẲNG NGHỀ CÔNG
              NGHIỆP HÀ NỘI - KHOA CÔNG NGHỆ THÔNG TIN
            </motion.p>

            {/* Animated Heading */}
            <AnimatedHeading
              text={`TƯ VẤN LIÊN THÔNG KHỐI 45, 46 
                HỆ SONG BẰNG 
                NGHỀ CÔNG NGHỆ THÔNG TIN 
                & 
                NGHỀ THIẾT KẾ ĐỒ HỌA`}
            />

            {/* CTA Button */}
            <motion.div
              variants={textVariants}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mt-8"
            >
              <a
                href="#about"
                className="inline-block px-8 py-4 bg-white text-indigo-700 text-2xl font-bold rounded-full shadow-2xl hover:scale-105 transition-transform"
              >
                Tìm Hiểu Ngay
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Animated Shapes trong Hero Section */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-30"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full opacity-20"
          animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Giới Thiệu Section */}
      <About />

      {/* Quy Mô Đào Tạo Section */}
      <TrainingFacilities />

      {/* Chương Trình Đào Tạo Section */}
      <TrainingProgram />

      {/* OutstandingStudents Section */}
      <OutstandingStudents />

      {/* Hoạt Động Section */}
      <Activities />

      {/* Footer */}
      <Footer />
    </main>
  );
}
