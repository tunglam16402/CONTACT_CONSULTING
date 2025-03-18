"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import LazyRender from "@/components/ui/LazyRender";
import Image from "next/image";
import { Users, GraduationCap, Trophy, Palette, Music } from "lucide-react";
import { useRef } from "react";

const activities = [
  {
    title: "Khóa đào tạo CNTT Hàn Quốc",
    image: "/assets/images/activities1.png",
    icon: GraduationCap,
    description:
      "Trải nghiệm học tập quốc tế với chương trình đào tạo CNTT từ Hàn Quốc",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Tham quan Esoft",
    image: "/assets/images/activities2.png",
    icon: Users,
    description: "Khám phá môi trường làm việc thực tế tại công ty Esoft",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Hội diễn văn nghệ",
    image: "/assets/images/activities3.png",
    icon: Music,
    description: "Thể hiện tài năng nghệ thuật trong các hoạt động văn nghệ",
    gradient: "from-pink-500/20 to-red-500/20",
  },
  {
    title: "Cuộc thi TKĐH",
    image: "/assets/images/activities4.png",
    icon: Trophy,
    description:
      "Tham gia và gặt hái thành công trong cuộc thi Thiết kế đồ họa",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    title: "Sáng tạo không giới hạn",
    image: "/assets/images/activities5.png",
    icon: Palette,
    description: "Thỏa sức sáng tạo trong các dự án thực tế",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
];

const Activities = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <LazyRender>
      <section
        ref={containerRef}
        id="hoatdong"
        className="py-32 bg-main-gradient relative overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 opacity-5"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>

        {/* Decorative Background Images */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-32 top-1/4 w-96 h-96"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/assets/images/decoration/tech-pattern-1.png"
              alt=""
              fill
              className="object-contain opacity-10"
            />
          </motion.div> */}

          {/* Right Side Decoration */}
          {/* <motion.div
            className="absolute -right-32 top-1/3 w-96 h-96"
            animate={{
              rotate: [360, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/assets/images/decoration/tech-pattern-2.png"
              alt=""
              fill
              className="object-contain opacity-10"
            />
          </motion.div> */}

          {/* Center Decoration */}
          {/* <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src="/assets/images/decoration/tech-pattern-3.png"
              alt=""
              fill
              className="object-contain opacity-5"
            />
          </motion.div> */}
        {/* </div> */}

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              style={{
                width: "200%",
                top: `${30 + i * 20}%`,
                left: "-50%",
              }}
              animate={{
                x: ["-50%", "0%"],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="relative inline-block">
                  <span className="relative bg-clip-text text-transparent bg-title-gradient">
                    HOẠT ĐỘNG SINH VIÊN
                  </span>
                </span>
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                Khám phá những khoảnh khắc đáng nhớ trong hành trình học tập và
                phát triển của sinh viên HNIVC
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 flex justify-end"
            >
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                        <activity.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {activity.title}
                      </h3>
                    </div>
                    <p className="text-gray-200 text-sm">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LazyRender>
  );
};

export default Activities;
