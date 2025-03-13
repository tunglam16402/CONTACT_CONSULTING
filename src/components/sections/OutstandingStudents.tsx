"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LazyRender from "@/components/ui/LazyRender";
import {
  FaGraduationCap,
  FaMedal,
  FaArrowLeft,
  FaInstagram,
} from "react-icons/fa";

interface Student {
  name: string;
  info: string;
  projects: { title: string; image: string }[];
  photo: string;
}

const students: Student[] = [
  {
    name: "Bùi Đức Toàn",
    info: "Sinh ngày: 15/12/2004. IG: toanduc62. Học sinh hệ trung cấp 9+ liên thông lên cao đẳng tại lớp CĐ43TKDH-LT, đã tốt nghiệp tại trường HNIVC. Hiện nay đang học Đại Học Mỹ Thuật Công Nghiệp.",
    projects: [
      {
        title: "Sản phẩm về thiết kế poster cho ban nhạc Deftones",
        image: "/assets/images/buiductoan_project1.png",
      },
      {
        title:
          "Sản phẩm về thiết kế banner cho sự hợp tác giữa trường HNIVC với trường TNU",
        image: "/assets/images/buiductoan_project2.png",
      },
    ],
    photo: "/assets/images/SVtieubieu1.png",
  },
  {
    name: "Bùi Minh Đức",
    info: "Sinh ngày: 04/09/2003, IG: duc_ko_gay. Học sinh hệ trung cấp 9+ liên thông lên cao đẳng tại lớp CĐ43TKDH-LT, đã tốt nghiệp tại trường HNIVC. Hiện nay đang học Đại Học Mỹ Thuật Công Nghiệp.",
    projects: [
      {
        title:
          "Sản phẩm về thiết kế poster cho một band nhạc mang tên RadioHead",
        image: "/assets/images/buiminhduc_project1.png",
      },
      {
        title:
          "Sản phẩm về thiết kế nhân vật hoạt hình và nhận vật đại diện của trường HNIVC",
        image: "/assets/images/buiminhduc_project2.png",
      },
    ],
    photo: "/assets/images/SVtieubieu2.png",
  },
  {
    name: "Khúc Tuấn Linh",
    info: "Sinh ngày: 29/01/2001.Là học sinh hệ Cao Đẳng K43 Khoa CNTT.Được tuyên dương là 1 trong 100 em học sinh, sinh viên giáo dục nghề nghiệp xuất sắc, tiêu biểu năm 2022.Đạt giải vàng trong kì thi kỹ năng nghề Quốc Gia về quản trị mạng năm 2022.Hiện đang là cán bộ tại nhà trường HNIVC.",
    projects: [
      {
        title:
          "Lễ trao giải tuyên dương 1 trong 100 em học sinh, sinh viên giáo dục nghề nghiệp xuất sắc, tiêu biểu năm 2022",
        image: "/assets/images/khuctuanlinh_achiement.jpg",
      },
    ],
    photo: "/assets/images/SVtieubieu3.jpg",
  },
  {
    name: "Doãn Tuấn Phong",
    info: "Học Trung Cấp ESTIH liên thông cao đẳng quản trị mạng tại HNIVC.Giải nhất quốc gia nghề quản trị mạng hệ thống CNTT năm 2020.Hiện đang làm ở CMC Telecom.Đứng thứ 6 trong cuộc thi Asean Skills Camp",
    projects: [
      {
        title: "Giải nhất quốc gia nghề quản trị mạng hệ thống CNTT năm 2020",
        image: "/assets/images/doantuanphong_achiement.jpg",
      },
    ],
    photo: "/assets/images/SVtieubieu4.png",
  },
];

export default function OutstandingStudents() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isInView && selectedStudent) {
      timer = setTimeout(() => {
        setSelectedStudent(null);
        setActiveTab("info");
      }, 15000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isInView, selectedStudent]);

  return (
    <LazyRender>
      <section
        ref={sectionRef}
        id="sinhvientieubieu"
        className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-purple-500/10" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SINH VIÊN TIÊU BIỂU KHOA CNTT
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          {selectedStudent === null ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {students.map((student, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={student.photo}
                      alt={student.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {student.name}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-300 mb-3">
                        <FaGraduationCap />
                        <span className="text-sm">HNIVC Graduate</span>
                      </div>
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="w-full py-2 px-4 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <span>Xem chi tiết</span>
                        <FaMedal className="text-yellow-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
              >
                <FaArrowLeft />
                <span>Quay lại</span>
              </button>

              <div className="flex flex-col md:flex-row gap-8 mt-8">
                <motion.div
                  className="w-full md:w-1/3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={selectedStudent.photo}
                      alt={selectedStudent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {selectedStudent.name}
                    </h2>
                    <div className="flex items-center gap-2 text-blue-300 text-lg">
                      <FaInstagram />
                      <span>
                        @{selectedStudent.info.match(/IG: ([^\s.]+)/)?.[1]}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1">
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => setActiveTab("info")}
                      className={`px-4 py-2 rounded-lg text-lg transition-all duration-300 ${
                        activeTab === "info"
                          ? "bg-blue-500 text-white"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      Thông tin
                    </button>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`px-4 py-2 rounded-lg text-lg transition-all duration-300 ${
                        activeTab === "projects"
                          ? "bg-blue-500 text-white"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      Thành tựu
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === "info" ? (
                      <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-white/80 space-y-3"
                      >
                        {selectedStudent.info.split(".").map((line, index) => {
                          const trimmedLine = line.trim();
                          if (!trimmedLine) return null;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 bg-white/5 p-3 rounded-lg"
                            >
                              <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-400" />
                              <p className="text-lg">{trimmedLine}.</p>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white/5 rounded-lg p-4"
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Thành tựu nổi bật
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedStudent.projects.map((project, idx) => (
                            <Dialog key={idx}>
                              <DialogTrigger asChild>
                                <motion.div
                                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                    <p className="text-white text-xs">
                                      {project.title}
                                    </p>
                                  </div>
                                </motion.div>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <div className="relative aspect-video">
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </LazyRender>
  );
}
