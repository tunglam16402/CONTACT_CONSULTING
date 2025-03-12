"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    requestAnimationFrame(() => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${id}`, offsetY: 70 },
        ease: "power2.out",
      });
    });
  };

  return (
    <motion.nav
      style={{ willChange: "transform, opacity" }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 1.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 p-4 transition-all text-lg ${
        scrolling
          ? "bg-white bg-opacity-90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="KHOA CNTT Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
        <ul className="flex space-x-8">
          {[
            { id: "hero", name: "Trang chủ" },
            { id: "gioithieu", name: "Giới thiệu" },
            { id: "quymodao-tao", name: "Quy mô đào tạo" },
            { id: "cosovatchat", name: "Cơ sở vật chất" },
            { id: "chuongtrinh", name: "Chương trình đào tạo" },
            { id: "sinhvientieubieu", name: "Sinh viên tiêu biểu" },
            { id: "hoatdong", name: "Hoạt động" },
          ].map((item) => (
            <li key={item.id}>
              <motion.button
                onClick={() => smoothScroll(item.id)}
                whileHover={{ scale: 1.03 }}
                transition={{
                  type: "tween",
                  duration: 0.25,
                  ease: "easeInOut",
                }}
                className={`cursor-pointer transition ${
                  scrolling ? "text-gray-900" : "text-white"
                }`}
              >
                {item.name}
              </motion.button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
