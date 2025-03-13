"use client";

// import { motion } from "framer-motion";
import LazyRender from "@/components/ui/LazyRender";

const Footer = () => {
  return (
    <LazyRender>
      <footer className="py-8 bg-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Khoa Công Nghệ Thông Tin - Trường
            Cao Đẳng Nghề Công Nghiệp Hà Nội
          </p>
        </div>
      </footer>
    </LazyRender>
  );
};

export default Footer;
