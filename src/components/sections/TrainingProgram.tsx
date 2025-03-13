"use client";

import { motion } from "framer-motion";
import LazyRender from "@/components/ui/LazyRender";

const TrainingProgram = () => {
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
        duration: 0.6,
      },
    },
  };

  return (
    <LazyRender>
      <section
        id="chuongtrinh"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            CHƯƠNG TRÌNH ĐÀO TẠO HỆ LIÊN THÔNG
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Công nghệ thông tin (Ứng dụng phần mềm)
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Đào tạo: Chuyên viên quản trị hệ thống phần mềm; Chuyên viên
                quản lý dữ liệu; Lập trình viên phần mềm ứng dụng; Chuyên viên
                tư vấn và chuyển giao phần mềm ứng dụng; Chuyên viên thiết kế và
                quản trị website; Tự khởi nghiệp trong lĩnh vực phát triển phần
                mềm.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Thiết kế đồ họa
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Đào tạo: Thiết kế sản phẩm, bao bì sản phẩm, ấn phẩm quảng cáo
                và xuất bản sách, báo, tạp chí; Biên tập, xử lý hình ảnh, video,
                âm thanh; Thiết kế sản phẩm đồ họa truyền thông đa phương tiện;
                Thiết kế đối tượng đồ họa cho Games, hoạt hình 2D; Thiết kế đối
                tượng đồ họa quảng cáo sản phẩm 3D; Thiết kế các mô hình quảng
                cáo không gian.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 md:col-span-2 lg:col-span-1"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Truyền thông và mạng máy tính
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Đào tạo: Chuyên viên thiết kế, thi công và giám sát thi công các
                hệ thống mạng máy tính; Chuyên viên quản trị mạng và hệ thống;
                Chuyên viên quản trị bảo mật máy chủ, mạng và cơ sở dữ liệu;
                Chuyên viên phân tích và thiết kế hệ thống thông tin; Chuyên
                viên phát triển ứng dụng web; Chuyên viên truyền thông trực
                tiếp, trực tuyến và quản trị truyền thông mạng xã hội.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </LazyRender>
  );
};

export default TrainingProgram;
