"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LazyRender from "@/components/ui/LazyRender";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const sectionVariants = {
  hidden: { opacity: 0, x: -50, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const images = [
  "/assets/images/gioithieu1.png",
  "/assets/images/gioithieu2.png",
  "/assets/images/gioithieu3.png",
];

const About = () => {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LazyRender>
      <section id="gioithieu" className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 items-center px-6">
          {/* Slideshow - Ảnh lớn bên trái */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => setSelectedImage(images[index])}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index]}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Nội dung bên phải */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-left"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Giới Thiệu
            </h2>
            <Separator className="w-16 mb-4 bg-gray-800" />
            <p className="text-gray-700 text-lg leading-relaxed">
              Khoa Công nghệ thông tin được thành lập năm 1993 với đội ngũ giảng
              viên chất lượng cao, đạt chuẩn Tiến sĩ, Thạc sĩ. Có nhiều thành
              tích trong công tác bồi dưỡng giáo viên giỏi và huấn luyện thí
              sinh dự thi Kỹ năng nghề thành phố, quốc gia và khu vực ASIA.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <span className="text-green-600">✔</span>
                <span>Đội ngũ giảng viên hàng đầu</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-600">✔</span>
                <span>Cơ sở vật chất hiện đại</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-600">✔</span>
                <span>Chương trình đào tạo thực tiễn</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Dialog hiển thị ảnh phóng to khi click */}
        {selectedImage && (
          <Dialog
            open={true}
            onOpenChange={(open) => {
              if (!open) setSelectedImage(null);
            }}
          >
            <DialogContent className="max-w-none w-full p-0 sm:p-4">
              {/* Container ảnh chiếm 90% chiều rộng và 80% chiều cao màn hình */}
              <div className="relative w-[90vw] h-[80vh] mx-auto">
                <Image
                  src={selectedImage}
                  alt="Expanded Slide"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </section>
    </LazyRender>
  );
};

export default About;
