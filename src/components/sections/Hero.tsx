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
          <div className="space-y-2 mt-8">
            <AnimatedHeading
              text="TƯ VẤN LIÊN THÔNG KHỐI 45, 46"
              className="text-3xl md:text-4xl font-bold text-white"
            />
            <AnimatedHeading
              text="HỆ SONG BẰNG"
              className="text-2xl md:text-3xl font-semibold text-white/90 mb-8"
            />
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-indigo-400/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                ></motion.div>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors duration-500"
                  >
                    <svg
                      className="w-6 h-6 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xl font-medium uppercase text-white/90 group-hover:text-white transition-colors duration-300"
                  >
                    Thiết kế đồ họa
                  </motion.span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                ></motion.div>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-500"
                  >
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xl font-medium uppercase  text-white/90 group-hover:text-white transition-colors duration-300"
                  >
                    Công nghệ thông tin
                  </motion.span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-pink-400/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                ></motion.div>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors duration-500"
                  >
                    <svg
                      className="w-6 h-6 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xl font-medium uppercase text-white/90 group-hover:text-white transition-colors duration-300"
                  >
                    Mạng máy tính
                  </motion.span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-red-400/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                ></motion.div>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors duration-500"
                  >
                    <svg
                      className="w-6 h-6 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </motion.div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xl font-medium uppercase text-white/90 group-hover:text-white transition-colors duration-300"
                  >
                    Lập trình máy tính
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-12"
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
