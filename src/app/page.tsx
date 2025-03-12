"use client";
import { memo } from "react";
import { useLayoutEffect } from "react";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import gsap from "gsap";
import Image from "next/image";
import heroImage from "../../public/assets/images/banner3.jpg";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";

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

const LazyRender = memo(({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return <div ref={ref}>{inView ? children : null}</div>;
});

LazyRender.displayName = "LazyRender";

export default function Home() {
  usePersistScroll(); // Áp dụng giữ trạng thái cuộn

  return (
    <main className="text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-800 animate-gradient" />

        {/* Background Image */}
        <Image
          src={heroImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-20"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-30" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Subtitle Animation */}
          <motion.p
            className="text-lg md:text-2xl text-white max-w-3xl mx-auto mb-4 drop-shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI - TRƯỜNG CAO ĐẲNG NGHỀ CÔNG NGHIỆP
            HÀ NỘI - KHOA CÔNG NGHỆ THÔNG TIN
          </motion.p>

          {/* Title Animation sử dụng AnimatedHeading */}
          <AnimatedHeading
            text={`TƯ VẤN LIÊN THÔNG KHỐI 45, 46 
HỆ SONG BẰNG
NGHỀ CÔNG NGHỆ THÔNG TIN 
&
NGHỀ THIẾT KẾ ĐỒ HỌA`}
          />

          {/* CTA Button */}
          <motion.div
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-6"
          >
            <a
              href="#about"
              className="px-6 py-3 bg-white text-blue-600 text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Tìm Hiểu Ngay
            </a>
          </motion.div>
        </div>

        {/* Floating Shapes */}
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/20 rounded-full blur-xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-lg"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Giới Thiệu Section */}
      <About />

      {/* Quy Mô Đào Tạo Section */}
      <LazyRender>
        <section id="quymodao-tao" className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              QUY MÔ ĐÀO TẠO
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-4">
              Tổng số lớp Cao Đẳng: 12 lớp (trong đó có 01 lớp liên thông
              CĐ47LT-CNTT).
            </p>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Tổng số HSSV: 416 sinh viên đang đào tạo 04 nghành/nghề.
            </p>
          </div>
        </section>
      </LazyRender>

      {/* Cơ Sở Vật Chất Section */}
      <LazyRender>
        <section id="cosovatchat" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              CƠ SỞ VẬT CHẤT
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              07 phòng máy thực hành cấu hình cao với CPU từ core i5 đến i7 thế
              hệ 11 (Tiger Lake) và màn hình LED 21” đảm bảo môi trường học tập
              hiện đại.
            </p>
          </div>
        </section>
      </LazyRender>

      {/* Chương Trình Đào Tạo Section */}
      <LazyRender>
        <section id="chuongtrinh" className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              CHƯƠNG TRÌNH ĐÀO TẠO HỆ LIÊN THÔNG
            </motion.h2>
            <div className="space-y-12 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  Công nghệ thông tin (Ứng dụng phần mềm)
                </h3>
                <p className="text-gray-600">
                  Đào tạo: Chuyên viên quản trị hệ thống phần mềm; Chuyên viên
                  quản lý dữ liệu; Lập trình viên phần mềm ứng dụng; Chuyên viên
                  tư vấn và chuyển giao phần mềm ứng dụng; Chuyên viên thiết kế
                  và quản trị website; Tự khởi nghiệp trong lĩnh vực phát triển
                  phần mềm.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  Thiết kế đồ họa
                </h3>
                <p className="text-gray-600">
                  Đào tạo: Thiết kế sản phẩm, bao bì sản phẩm, ấn phẩm quảng cáo
                  và xuất bản sách, báo, tạp chí; Biên tập, xử lý hình ảnh,
                  video, âm thanh; Thiết kế sản phẩm đồ họa truyền thông đa
                  phương tiện; Thiết kế đối tượng đồ họa cho Games, hoạt hình
                  2D; Thiết kế đối tượng đồ họa quảng cáo sản phẩm 3D; Thiết kế
                  các mô hình quảng cáo không gian.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                  Truyền thông và mạng máy tính
                </h3>
                <p className="text-gray-600">
                  Đào tạo: Chuyên viên thiết kế, thi công và giám sát thi công
                  các hệ thống mạng máy tính; Chuyên viên quản trị mạng và hệ
                  thống; Chuyên viên quản trị bảo mật máy chủ, mạng và cơ sở dữ
                  liệu; Chuyên viên phân tích và thiết kế hệ thống thông tin;
                  Chuyên viên phát triển ứng dụng web; Chuyên viên truyền thông
                  trực tiếp, trực tuyến và quản trị truyền thông mạng xã hội.
                </p>
              </div>
            </div>
          </div>
        </section>
      </LazyRender>

      {/* OutstandingStudents Section */}
      <LazyRender>
        <OutstandingStudents />
      </LazyRender>

      {/* Hoạt Động Section */}
      <LazyRender>
        <section id="hoatdong" className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              HOẠT ĐỘNG SINH VIÊN
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Sinh viên tham gia các hoạt động: khóa đào tạo CNTT của Hàn Quốc;
              tham quan công ty Esoft; tham gia hội diễn văn nghệ; dự cuộc thi
              TKĐH; thỏa sức sáng tạo.
            </p>
          </div>
        </section>
      </LazyRender>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Khoa Công Nghệ Thông Tin - Trường
            Cao Đẳng Nghề Công Nghiệp Hà Nội
          </p>
        </div>
      </footer>
    </main>
  );
}
