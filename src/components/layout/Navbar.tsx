"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);

      // Xác định section đang active
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section: Element) => {
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId || "hero");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    requestAnimationFrame(() => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${id}`, offsetY: 70 },
        ease: "power2.out",
      });
    });
  };

  const menuItems = [
    // { id: "hero", name: "Trang chủ" },
    { id: "gioithieu", name: "Giới thiệu" },
    { id: "quymodaotao", name: "Quy mô đào tạo" },
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolling
          ? "bg-white/95 shadow-lg backdrop-blur-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative mr-4 z-50">
            <Image
              src="/assets/images/logo.png"
              alt="KHOA CNTT Logo"
              width={200}
              height={70}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => smoothScroll(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-2.5 text-2xl font-bold transition-all duration-300 ${
                  scrolling
                    ? activeSection === item.id
                      ? "text-blue-600"
                      : "text-gray-900 hover:text-blue-600"
                    : activeSection === item.id
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
                <motion.div
                  className={`absolute bottom-0 left-0 w-full h-1.5 rounded-full ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                      : "bg-transparent"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: activeSection === item.id ? 1 : 0,
                    opacity: activeSection === item.id ? 1 : 0,
                  }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
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
            <div className="w-8 h-7 relative flex flex-col justify-between">
              <motion.span
                className={`w-full h-0.5 rounded-full transition-colors duration-300 ${
                  scrolling ? "bg-gray-900" : "bg-white"
                }`}
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`w-full h-0.5 rounded-full transition-colors duration-300 ${
                  scrolling ? "bg-gray-900" : "bg-white"
                }`}
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`w-full h-0.5 rounded-full transition-colors duration-300 ${
                  scrolling ? "bg-gray-900" : "bg-white"
                }`}
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
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
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg"
            >
              <div className="pt-28 pb-10 px-6">
                <div className="flex flex-col space-y-8">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => smoothScroll(item.id)}
                      whileHover={{ x: 10 }}
                      className={`text-2xl font-bold py-4 text-left relative ${
                        activeSection === item.id
                          ? "text-blue-600"
                          : "text-gray-900 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                      {activeSection === item.id && (
                        <motion.div
                          className="absolute left-0 bottom-0 w-16 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                          layoutId="activeIndicator"
                          transition={{ duration: 0.3 }}
                        />
                      )}
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
