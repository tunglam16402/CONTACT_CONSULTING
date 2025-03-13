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
import Cooperate from "@/components/sections/Cooperate";

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
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  usePersistScroll();

  // Xử lý loading progress
  useEffect(() => {
    const splashDisplayed = sessionStorage.getItem("splashDisplayed");
    if (splashDisplayed) {
      setLoading(false);
      return;
    }
    const startTime = Date.now();
    const duration = 2500; // 2.5 giây

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("splashDisplayed", "true");
        }, 500);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // WebGL Effect
  useEffect(() => {
    if (loading) {
      const canvas = document.getElementById(
        "webgl-background"
      ) as HTMLCanvasElement;
      const gl = canvas.getContext("webgl");

      if (!gl) return;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;

      gl.shaderSource(
        vertexShader,
        `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `
      );

      gl.shaderSource(
        fragmentShader,
        `
        precision highp float;
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          float t = time * 0.5;
          
          // Mouse interaction
          vec2 mousePos = mouse * 0.5 + 0.5;
          float dist = length(uv - mousePos);
          
          // Dynamic pattern
          vec3 color = vec3(0.0);
          for(float i = 1.0; i < 5.0; i++) {
            float scale = i * 10.0;
            vec2 q = vec2(
              cos(uv.x * scale + t) * 0.5 + 0.5,
              sin(uv.y * scale + t) * 0.5 + 0.5
            );
            
            // Mouse influence
            float influence = smoothstep(1.0, 0.0, dist * 2.0);
            q += vec2(mouse.x, mouse.y) * influence * 0.2;
            
            // Color mixing
            vec3 c = vec3(q.x, q.y, 0.5) * (1.0 / i);
            c *= 1.0 + influence * 0.5;
            color += c;
          }
          
          // Add glow effect
          float glow = smoothstep(1.0, 0.0, dist * 3.0);
          color += vec3(0.5, 0.8, 1.0) * glow * 0.5;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
      );

      gl.compileShader(vertexShader);
      gl.compileShader(fragmentShader);

      const program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const startTime = Date.now();
      const animate = () => {
        const time = (Date.now() - startTime) * 0.001;
        gl.uniform1f(gl.getUniformLocation(program, "time"), time);
        gl.uniform2f(
          gl.getUniformLocation(program, "resolution"),
          canvas.width,
          canvas.height
        );
        gl.uniform2f(
          gl.getUniformLocation(program, "mouse"),
          mousePosition.x,
          mousePosition.y
        );

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(animate);
      };
      animate();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        gl.deleteProgram(program);
      };
    }
  }, [loading, mousePosition]);

  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 bg-[#0D0D1F] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1.5 }}
      >
        {/* WebGL Background */}
        <canvas
          id="webgl-background"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.8 }}
        />

        {/* Loading Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* 3D Progress Ring */}
          <div className="relative w-40 h-40 perspective-1000">
            <motion.div
              className="absolute inset-0"
              animate={{
                rotateY: 360,
                rotateX: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <circle
                  className="text-gray-700"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                />
              </svg>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {Math.round(progress)}%
              </motion.div>
            </div>
          </div>

          {/* Loading Text */}
          <motion.div
            className="mt-8 text-2xl font-medium text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Đ
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
            >
              a
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              n
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              g
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              t
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              ả
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              i
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
            >
              .
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              .
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            >
              .
            </motion.span>
          </motion.div>
        </div>

        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/10 via-purple-500/10 to-pink-500/10" />
      </motion.div>
    );
  }

  // Add WebGL initialization effect
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
            {/* <motion.p
              className="mb-4 text-white text-xl drop-shadow-lg"
              variants={textVariants}
              transition={{ duration: 0.8 }}
            >
              ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI - TRƯỜNG CAO ĐẲNG NGHỀ CÔNG
              NGHIỆP HÀ NỘI - KHOA CÔNG NGHỆ THÔNG TIN
            </motion.p> */}

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

      {/* THỰC TẬP DOANH NGHIỆP VÀ HỢP TÁC QUỐC TẾ */}
      <Cooperate />

      {/* Chương Trình Đào Tạo Section */}
      <TrainingProgram />

      {/* sinh viên tiêu biểu Section */}
      <OutstandingStudents />

      {/* Hoạt Động Section */}
      <Activities />

      {/* Footer */}
      <Footer />
    </main>
  );
}
