"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import heroImage from "../../../public/assets/images/banner3.jpg";
import { useState } from "react";
import RegisterForm from "@/components/forms/RegisterForm";

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
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);

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
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
          }
          50% {
            box-shadow: 0 0 50px rgba(99, 102, 241, 0.8);
          }
          100% {
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes gradient-x {
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
        @keyframes borderGlow {
          0% {
            border-color: rgba(255, 255, 255, 0.2);
          }
          50% {
            border-color: rgba(255, 255, 255, 0.5);
          }
          100% {
            border-color: rgba(255, 255, 255, 0.2);
          }
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        @keyframes particleFloat {
          0% { transform: translate(0, 0); }
          50% { transform: translate(var(--tx), var(--ty)); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particleGlow {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
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
            <button
              onClick={() => setIsRegisterFormOpen(true)}
              className="group cursor-pointer relative inline-flex items-center justify-center px-12 py-4 text-2xl font-bold text-white uppercase transition-all duration-500 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] hover:scale-105 active:scale-95 backdrop-blur-sm bg-opacity-90 border border-white/20 overflow-hidden"
              style={{
                animation:
                  "pulseGlow 3s ease-in-out infinite, float 3s ease-in-out infinite, borderGlow 2s ease-in-out infinite",
              }}
            >
              <span className="relative z-10">Đăng Ký Xét Tuyển Ngay</span>
              {/* Rotating gradient background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-x"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rotate-45"></div>
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 transition-colors duration-500"></div>
              {/* Pulsing glow */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Rotating gradient overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-rotate"></div>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Register Form */}
      <RegisterForm
        isOpen={isRegisterFormOpen}
        onClose={() => setIsRegisterFormOpen(false)}
      />

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
