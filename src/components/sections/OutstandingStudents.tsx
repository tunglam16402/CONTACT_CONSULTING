"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LazyRender from "@/components/ui/LazyRender";
import {
  FaGraduationCap,
  FaArrowLeft,
  FaInstagram,
} from "react-icons/fa";

interface Student {
  name: string;
  info: string;
  study: string;
  projects: { title: string; image: string }[];
  photo: string;
}

const students: Student[] = [
  {
    name: "Bùi Đức Toàn",
    info: "Sinh ngày: 15/12/2004. IG: toanduc62. Học sinh hệ trung cấp 9+ liên thông lên cao đẳng tại lớp CĐ43TKDH-LT, đã tốt nghiệp tại trường HNIVC. Hiện nay đang học Đại Học Mỹ Thuật Công Nghiệp.",
    study: "Hệ trung cấp 9+ liên thông lên hệ cao đẳng tại lớp CĐ43TKDH-LT",
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
    study: "Hệ trung cấp 9+ liên thông lên hệ cao đẳng tại lớp CĐ43TKDH-LT",
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
    study: "Hệ Cao Đẳng K43 Khoa CNTT",
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
    study: "Trung Cấp ESTIH liên thông cao đẳng quản trị mạng tại HNIVC",
    projects: [
      {
        title: "Giải nhất quốc gia nghề quản trị mạng hệ thống CNTT năm 2020",
        image: "/assets/images/doantuanphong_achiement.jpg",
      },
    ],
    photo: "/assets/images/doantuanphong.jpg",
  },
];

export default function OutstandingStudents() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });
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
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="relative inline-block">
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                  SINH VIÊN TIÊU BIỂU KHOA CNTT
                </span>
              </span>
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {students.map((student, index) => (
                <motion.div
                  key={index}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[500px] bg-gradient-to-b from-blue-500/20 to-purple-500/20 p-1">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-[100px] z-10" />
                    <Image
                      src={student.photo}
                      alt={student.name}
                      fill
                      className="object-cover rounded-[500px] transition-all duration-500 group-hover:scale-105 group-hover:brightness-45"
                    />
                  </div>

                  {/* Hover Info */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 rounded-[100px]">
                      <h3 className="text-3xl font-bold text-white mb-4 text-center">
                        {student.name}
                      </h3>
                      <div className="flex flex-col justify-center items-center gap-3 text-blue-100 text-lg">
                        <FaGraduationCap className="w-6 h-6" />
                        <span className="text-center">{student.study}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="bg-white shadow-lg rounded-xl border border-gray-100 p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2 text-sm hover:bg-gray-50 px-3 py-1.5 rounded-lg"
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
                  <div className="relative aspect-[3/4] rounded-[60px] overflow-hidden shadow-lg">
                    <Image
                      src={selectedStudent.photo}
                      alt={selectedStudent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {selectedStudent.name}
                    </h2>
                    <div className="flex items-center gap-2 text-blue-600 text-lg">
                      <FaInstagram className="w-5 h-5" />
                      <span>
                        @{selectedStudent.info.match(/IG: ([^\s.]+)/)?.[1]}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1">
                  <div className="flex gap-3 mb-8">
                    <button
                      onClick={() => setActiveTab("info")}
                      className={`px-6 py-2.5 rounded-lg text-lg transition-all duration-300 ${
                        activeTab === "info"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Thông tin
                    </button>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`px-6 py-2.5 rounded-lg text-lg transition-all duration-300 ${
                        activeTab === "projects"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
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
                        className="space-y-4"
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
                              className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-300"
                            >
                              <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                              <p className="text-lg text-gray-700 leading-relaxed">
                                {trimmedLine}.
                              </p>
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
                        className="bg-gray-50 rounded-lg p-6 border border-gray-100"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                          Thành tựu nổi bật
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedStudent.projects.map((project, idx) => (
                            <Dialog key={idx}>
                              <DialogTrigger asChild>
                                <motion.div
                                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                  <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm font-medium">
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
