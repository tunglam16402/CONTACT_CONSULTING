"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    requestAnimationFrame(() => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${id}`, offsetY: 70 },
        ease: "power2.out",
      });
    });
  };

  const menuItems = [
    { id: "hero", name: "Trang chủ" },
    { id: "gioithieu", name: "Giới thiệu" },
    { id: "quymodao-tao", name: "Quy mô đào tạo" },
    { id: "cosovatchat", name: "Cơ sở vật chất" },
    { id: "chuongtrinh", name: "Chương trình đào tạo" },
    { id: "sinhvientieubieu", name: "Sinh viên tiêu biểu" },
    { id: "hoatdong", name: "Hoạt động" },
  ];

  return (
    <motion.nav
      style={{ willChange: "transform, opacity" }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 1.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling
          ? "bg-white/95 shadow-lg backdrop-blur-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative z-50">
            <Image
              src="/assets/images/logo.png"
              alt="KHOA CNTT Logo"
              width={150}
              height={50}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => smoothScroll(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  scrolling ? "text-gray-900" : "text-white"
                }`}
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                className={`w-full h-0.5 rounded-full transition-colors duration-200 ${
                  scrolling ? "bg-gray-900" : "bg-white"
                }`}
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
              />
              <motion.span
                className={`w-full h-0.5 rounded-full transition-colors duration-200 ${
                  scrolling ? "bg-gray-900" : "bg-white"
                }`}
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.span
                className={`w-full h-0.5 rounded-full transition-colors duration-200 ${
                  scrolling ? "bg-gray-900" : "bg-white"
                }`}
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg"
            >
              <div className="pt-20 pb-6 px-4">
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => smoothScroll(item.id)}
                      whileHover={{ x: 10 }}
                      className="text-gray-900 text-lg font-medium py-2 text-left"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
