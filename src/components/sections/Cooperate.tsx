"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import LazyRender from "@/components/ui/LazyRender";

const partners = [
  {
    name: "FPT Software",
    logo: "/assets/images/coop1.png",
  },
  {
    name: "Viettel",
    logo: "/assets/images/coop2.png",
  },
  {
    name: "VNG",
    logo: "/assets/images/coop3.jpg",
  },
  {
    name: "CMC",
    logo: "/assets/images/coop4.png",
  },
  {
    name: "Mobifone",
    logo: "/assets/images/coop5.png",
  },
  {
    name: "VinGroup",
    logo: "/assets/images/coop6.png",
  },
  {
    name: "Vietcombank",
    logo: "/assets/images/coop7.png",
  },
  {
    name: "VietinBank",
    logo: "/assets/images/coop8.jpg",
  },
  {
    name: "BIDV",
    logo: "/assets/images/coop9.png",
  },
  {
    name: "MB Bank",
    logo: "/assets/images/coop10.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Cooperate = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <LazyRender>
      <section id="doanhnghiep" className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          {/* Animated Gradient Orbs */}
          <div
            className="absolute w-[800px] h-[800px] rounded-full bg-blue-200 blur-3xl"
            style={{
              left: `${mousePosition.x - 400}px`,
              top: `${mousePosition.y - 400}px`,
              transition: "all 0.5s ease-out",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full bg-purple-200 blur-3xl"
            style={{
              right: `${mousePosition.x - 300}px`,
              bottom: `${mousePosition.y - 300}px`,
              transition: "all 0.5s ease-out",
            }}
          />
        </div>

        <div className="w-full mx-auto px-6 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-4xl text-center md:text-6xl font-bold text-gray-900 mb-6 ">
              <span className="">THỰC TẬP DOANH NGHIỆP VÀ HỢP TÁC QUỐC TẾ</span>
            </h2>
            <p className="text-gray-600 text-center text-xl">
              Đồng hành cùng các tập đoàn và công ty công nghệ hàng đầu Việt Nam
            </p>
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200"
                style={{
                  transform: `translateY(${index % 2 === 0 ? "-20px" : "0"})`,
                }}
              >
                <div className="relative w-full h-28">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </LazyRender>
  );
};

export default Cooperate;
