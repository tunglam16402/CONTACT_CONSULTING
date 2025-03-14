"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import {
  FaUsers,
  FaDesktop,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import LazyRender from "@/components/ui/LazyRender";

const trainingImages = [
  {
    src: "/assets/images/quymodaotao1.png",
    title: "Công Nghệ Thông Tin (UDPM)",
    description: "Đào tạo chuyên sâu về lập trình và phát triển phần mềm",
  },
  {
    src: "/assets/images/quymodaotao2.png",
    title: "Thiết kế đồ hoạ",
    description: "Đào tạo kỹ năng thiết kế và sáng tạo đồ họa chuyên nghiệp",
  },
  {
    src: "/assets/images/quymodaotao3.png",
    title: "Truyền thông và mạng máy tính",
    description: "Đào tạo về quản trị mạng và bảo mật hệ thống",
  },
  {
    src: "/assets/images/quymodaotao4.png",
    title: "Lập trình máy tính",
    description: "Đào tạo kỹ năng lập trình và phát triển ứng dụng",
  },
];

// Danh sách ảnh cơ sở vật chất
const facilityImages = [
  "/assets/images/cosovatchat1.jpg",
  "/assets/images/cosovatchat2.jpg",
  "/assets/images/cosovatchat3.jpg",
  "/assets/images/cosovatchat4.jpg",
  "/assets/images/cosovatchat5.jpg",
  "/assets/images/cosovatchat6.jpg",
];

export default function TrainingFacilities() {
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  // Tự động chuyển ảnh sau mỗi 4 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % trainingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % trainingImages.length);
  };

  const prevSlide = () => {
    setCurrentImage(
      (prev) => (prev - 1 + trainingImages.length) % trainingImages.length
    );
  };

  return (
    <LazyRender>
      <section
        id="quymodaotao"
        ref={sectionRef}
        className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-purple-500/10" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6"
          style={{ opacity, scale }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl uppercase font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Quy Mô Đào Tạo & Cơ Sở Vật Chất
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Training Scale */}
            <motion.div
              className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <FaUsers className="text-3xl text-blue-400" />
                </div>
                <h3 className="text-3xl uppercase font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Quy mô đào tạo
                </h3>
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-lg text-gray-300">
                      Tổng số lớp Cao Đẳng
                    </p>
                    <p className="text-3xl font-bold text-blue-400">12 lớp</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-lg text-gray-300">
                      Học sinh - Sinh viên
                    </p>
                    <p className="text-3xl font-bold text-purple-400">416</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-lg text-gray-300">Số ngành đào tạo</p>
                    <p className="text-3xl font-bold text-blue-400">4 ngành</p>
                  </div>
                </div>
              </CardContent>
            </motion.div>

            {/* Image Slider */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative w-full h-[534px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={trainingImages[currentImage].src}
                  alt={trainingImages[currentImage].title}
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                  <h4 className="text-xl font-semibold mb-2">
                    {trainingImages[currentImage].title}
                  </h4>
                  <p className="text-gray-300">
                    {trainingImages[currentImage].description}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaChevronLeft className="text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaChevronRight className="text-white" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
                  {trainingImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImage === index
                          ? "w-6 bg-blue-400"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Facilities Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaDesktop className="text-3xl text-purple-400" />
              </div>
              <h3 className="text-4xl font-semibold uppercase bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                Cơ sở vật chất hiện đại
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <p className="text-3xl font-semibold text-blue-400 mb-2">
                    07
                  </p>
                  <p className="text-gray-300">Phòng thực hành hiện đại</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <p className="text-3xl font-semibold text-purple-400 mb-2">
                    Core i5 - i7
                  </p>
                  <p className="text-gray-300">Gen 11</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <p className="text-3xl font-semibold text-blue-400 mb-2">
                    21
                  </p>
                  <p className="text-gray-300">Màn hình LED</p>
                </div>
              </div>
            </div>

            {/* Facility Images Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {facilityImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Image
                    src={image}
                    alt={`Facility ${index + 1}`}
                    fill
                    quality={100}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </LazyRender>
  );
}
