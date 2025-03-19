"use client";

import { motion } from "framer-motion";
import LazyRender from "@/components/ui/LazyRender";
import {
  CheckCircle2,
  Code2,
  Palette,
  Network,
  GraduationCap,
  BookOpen,
  Clock,
  Briefcase,
} from "lucide-react";

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
        className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-center bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            CHƯƠNG TRÌNH ĐÀO TẠO HỆ LIÊN THÔNG
          </motion.h2>
          <motion.div
            className="w-20 h-1 mb-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Lợi ích và Cơ hội học tập */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Lợi ích liên thông */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 p-8 rounded-xl border border-white/20 relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                    <GraduationCap className="w-10 h-10 text-blue-300" />
                  </div>
                  Lợi ích liên thông
                </h3>
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                        <Clock className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-blue-300">
                        Tiết kiệm thời gian và chi phí
                      </h4>
                    </div>
                    <p className="text-gray-200 leading-relaxed ml-11">
                      Liên thông cho phép bạn chuyển tiếp từ trung cấp nghề lên
                      cao đẳng nghề mà không cần phải học lại các môn đã học ở
                      trình độ trung cấp.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                        <Briefcase className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-blue-300">
                        Nâng cao trình độ chuyên môn
                      </h4>
                    </div>
                    <p className="text-gray-200 leading-relaxed ml-11">
                      Chương trình liên thông giúp bạn tiếp tục học tập và phát
                      triển kỹ năng chuyên môn, mở rộng kiến thức và cơ hội nghề
                      nghiệp.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cơ hội học tập */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 p-8 rounded-xl border border-white/20 relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                    <BookOpen className="w-10 h-10 text-purple-300" />
                  </div>
                  Cơ hội học tập
                </h3>
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                        <Code2 className="w-8 h-8 text-purple-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-blue-300">
                        Chương trình đa dạng
                      </h4>
                    </div>
                    <p className="text-gray-200 leading-relaxed ml-11">
                      Cao đẳng nghề cung cấp nhiều ngành học khác nhau, từ kỹ
                      thuật đến nghệ thuật, giúp bạn lựa chọn theo đam mê và sở
                      thích cá nhân.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                        <Palette className="w-8 h-8 text-purple-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-blue-300">
                        Học tập thực tế
                      </h4>
                    </div>
                    <p className="text-gray-200 leading-relaxed ml-11">
                      Cao đẳng nghề thường có chương trình học kết hợp giữa lý
                      thuyết và thực hành, giúp bạn phát triển kỹ năng thực tế
                      trong ngành nghề.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                    <Code2 className="w-10 h-10 text-blue-300" />
                  </div>
                  Công nghệ thông tin
                </h3>
                <div className="space-y-4">
                  {[
                    "Chuyên viên quản trị hệ thống phần mềm",
                    "Chuyên viên quản lý dữ liệu",
                    "Lập trình viên phần mềm ứng dụng",
                    "Chuyên viên tư vấn và chuyển giao phần mềm ứng dụng",
                    "Chuyên viên thiết kế và quản trị website",
                    "Tự khởi nghiệp trong lĩnh vực phát triển phần mềm",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10"
                    >
                      <div className="p-1 rounded-lg bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                        <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                      </div>
                      <p className="text-gray-200 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-2xl font-semibold text-purple-300 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                    <Palette className="w-10 h-10 text-purple-300" />
                  </div>
                  Thiết kế đồ họa
                </h3>
                <div className="space-y-4">
                  {[
                    "Thiết kế sản phẩm, bao bì sản phẩm, ấn phẩm quảng cáo và xuất bản sách, báo, tạp chí",
                    "Biên tập, xử lý hình ảnh, video, âm thanh",
                    "Thiết kế sản phẩm đồ họa truyền thông đa phương tiện",
                    "Thiết kế đối tượng đồ họa cho Games, hoạt hình 2D",
                    "Thiết kế đối tượng đồ họa quảng cáo sản phẩm 3D",
                    "Thiết kế các mô hình quảng cáo không gian",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10"
                    >
                      <div className="p-1 rounded-lg bg-purple-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                        <CheckCircle2 className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                      </div>
                      <p className="text-gray-200 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 relative group md:col-span-2 lg:col-span-1"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                    <Network className="w-10 h-10 text-blue-300" />
                  </div>
                  Truyền thông và mạng máy tính
                </h3>
                <div className="space-y-4">
                  {[
                    "Chuyên viên thiết kế, thi công và giám sát thi công các hệ thống mạng máy tính",
                    "Chuyên viên quản trị mạng và hệ thống",
                    "Chuyên viên quản trị bảo mật máy chủ, mạng và cơ sở dữ liệu",
                    "Chuyên viên phân tích và thiết kế hệ thống thông tin",
                    "Chuyên viên phát triển ứng dụng web",
                    "Chuyên viên truyền thông trực tiếp, trực tuyến và quản trị truyền thông mạng xã hội",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10"
                    >
                      <div className="p-1 rounded-lg bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                        <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                      </div>
                      <p className="text-gray-200 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </LazyRender>
  );
};

export default TrainingProgram;
