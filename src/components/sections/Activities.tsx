"use client";

import { motion } from "framer-motion";
import LazyRender from "@/components/ui/LazyRender";

const Activities = () => {
  return (
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
  );
};

export default Activities;
