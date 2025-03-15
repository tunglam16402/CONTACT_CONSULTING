"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import heroImage from "../../../public/assets/images/banner3.jpg";

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

export default function Hero() {
  return (
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
          priority
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
              href="#gioithieu"
              className="inline-block px-8 py-4 bg-white text-indigo-700 text-2xl font-bold rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              Tìm Hiểu Ngay
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Animated Shapes */}
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
  );
}
