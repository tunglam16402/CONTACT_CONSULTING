"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import LazyRender from "@/components/ui/LazyRender";
import { useRef } from "react";

const TrainingProgram = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const programs = [
    {
      title: "Công nghệ thông tin",
      subtitle: "(Ứng dụng phần mềm)",
      description:
        "Đào tạo: Chuyên viên quản trị hệ thống phần mềm; Chuyên viên quản lý dữ liệu; Lập trình viên phần mềm ứng dụng; Chuyên viên tư vấn và chuyển giao phần mềm ứng dụng; Chuyên viên thiết kế và quản trị website; Tự khởi nghiệp trong lĩnh vực phát triển phần mềm.",
      icon: "💻",
    },
    {
      title: "Thiết kế đồ họa",
      subtitle: "",
      description:
        "Đào tạo: Thiết kế sản phẩm, bao bì sản phẩm, ấn phẩm quảng cáo và xuất bản sách, báo, tạp chí; Biên tập, xử lý hình ảnh, video, âm thanh; Thiết kế sản phẩm đồ họa truyền thông đa phương tiện; Thiết kế đối tượng đồ họa cho Games, hoạt hình 2D; Thiết kế đối tượng đồ họa quảng cáo sản phẩm 3D; Thiết kế các mô hình quảng cáo không gian.",
      icon: "🎨",
    },
    {
      title: "Truyền thông",
      subtitle: "và mạng máy tính",
      description:
        "Đào tạo: Chuyên viên thiết kế, thi công và giám sát thi công các hệ thống mạng máy tính; Chuyên viên quản trị mạng và hệ thống; Chuyên viên quản trị bảo mật máy chủ, mạng và cơ sở dữ liệu; Chuyên viên phân tích và thiết kế hệ thống thông tin; Chuyên viên phát triển ứng dụng web; Chuyên viên truyền thông trực tiếp, trực tuyến và quản trị truyền thông mạng xã hội.",
      icon: "🌐",
    },
  ];

  return (
    <LazyRender>
      <section
        ref={sectionRef}
        id="chuongtrinh"
        className="relative py-32 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20" />

        <motion.div
          className="max-w-7xl mx-auto px-4 relative"
          style={{ opacity, scale }}
        >
          <div className="text-center mb-20">
            <motion.span
              className="inline-block text-blue-600 font-medium mb-4 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              CHƯƠNG TRÌNH
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ĐÀO TẠO HỆ LIÊN THÔNG
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                <span className="text-4xl mb-6 block">{program.icon}</span>

                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {program.title}
                  {program.subtitle && (
                    <span className="text-blue-600 block text-lg mt-1">
                      {program.subtitle}
                    </span>
                  )}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </LazyRender>
  );
};

export default TrainingProgram;
