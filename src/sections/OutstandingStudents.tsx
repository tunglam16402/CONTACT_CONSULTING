import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
      { title: "Dự án A", image: "/assets/projects/project3.jpg" },
      { title: "Dự án B", image: "/assets/projects/project4.jpg" },
    ],
    photo: "/assets/images/SVtieubieu2.png",
  },
  {
    name: "Khúc Tuấn Linh",
    info: "Sinh ngày: 29/01/2001. Học sinh hệ Cao Đẳng K43, được tuyên dương là 1 trong 100 em học sinh, sinh viên giáo dục nghề nghiệp xuất sắc, tiêu biểu năm 2022.",
    projects: [
      { title: "Dự án A", image: "/assets/projects/project5.jpg" },
      { title: "Dự án B", image: "/assets/projects/project6.jpg" },
    ],
    photo: "/assets/images/SVtieubieu3.jpg",
  },
  {
    name: "Doãn Tuấn Phong",
    info: "Học Trung Cấp ESTIH liên thông cao đẳng quản trị mạng tại HNIVC. Giải nhất quốc gia nghề quản trị mạng hệ thống CNTT năm 2020.",
    projects: [
      { title: "Dự án A", image: "/assets/projects/project7.jpg" },
      { title: "Dự án B", image: "/assets/projects/project8.jpg" },
    ],
    photo: "/assets/images/SVtieubieu4.png",
  },
];

export default function SinhVienTieuBieu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  // Khi section không còn trong viewport, reset (nếu cần)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isInView && selectedStudent) {
      timer = setTimeout(() => {
        setSelectedStudent(null);
        setActiveTab("info");
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isInView, selectedStudent]);

  return (
    <section
      ref={sectionRef}
      id="sinhvientieubieu"
      className="py-20 bg-gradient-to-br from-gray-100 to-white relative min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SINH VIÊN TIÊU BIỂU KHOA CNTT
        </motion.h2>

        {selectedStudent === null ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { staggerChildren: 0.1, duration: 0.6 },
              },
            }}
          >
            {students.map((student, index) => (
              <motion.div
                key={index}
                className="cursor-pointer relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedStudent(student)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="relative w-full h-80 md:h-[500px]">
                  <Image
                    src={student.photo}
                    alt={student.name}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-white text-xl font-semibold">
                      Xem chi tiết
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col md:flex-row items-start gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Thanh tab danh sách nhỏ bên trái */}
            <motion.div
              className="flex flex-col gap-4 p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {students.map((student, index) => {
                const isSelected = student.name === selectedStudent.name;
                return (
                  <motion.div
                    key={index}
                    className={`cursor-pointer rounded-full overflow-hidden shadow-lg transition-all ${
                      isSelected
                        ? "border-2 border-blue-500"
                        : "filter grayscale hover:filter-none"
                    }`}
                    onClick={() => setSelectedStudent(student)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative w-16 h-16">
                      <Image
                        src={student.photo}
                        alt={student.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Nội dung chi tiết bên phải */}
            <AnimatePresence mode="wait">
              {selectedStudent && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white relative rounded-lg shadow-2xl p-8 flex flex-col flex-1"
                >
                  {/* Thanh chuyển tab - đặt ở vị trí cố định */}
                  <motion.div
                    className="absolute top-[-40px] right-0 flex border border-gray-200 overflow-hidden bg-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <button
                      onClick={() => setActiveTab("info")}
                      className={`px-4 py-2 transition-all ${
                        activeTab === "info"
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      Thông tin
                    </button>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`px-4 py-2 transition-all ${
                        activeTab === "projects"
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      Dự án
                    </button>
                  </motion.div>

                  {/* Nội dung theo tab */}
                  {activeTab === "info" ? (
                    <div className="flex flex-col md:flex-row items-center">
                      {/* Ảnh lớn chỉ hiển thị ở tab info */}
                      <motion.div
                        className="w-full md:w-1/3 relative h-80 md:h-[500px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={selectedStudent.photo}
                          alt={selectedStudent.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </motion.div>

                      {/* Nội dung thông tin */}
                      <div className="w-full md:w-2/3 mt-6 md:mt-0 md:pl-8 flex flex-col items-center">
                        <motion.h2
                          className="text-4xl font-extrabold text-gray-800 mb-4"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {selectedStudent.name}
                        </motion.h2>
                        <motion.div
                          className="text-lg md:text-xl text-gray-700 leading-relaxed"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {selectedStudent.info
                            .split(".")
                            .map((line, index) => {
                              const trimmedLine = line.trim();
                              if (!trimmedLine) return null;
                              return (
                                <motion.div
                                  key={index}
                                  className="flex items-center mb-3"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                  }}
                                >
                                  <div className="w-3 h-6 mr-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded" />
                                  <span className="text-gray-700">
                                    {trimmedLine}.
                                  </span>
                                </motion.div>
                              );
                            })}
                        </motion.div>
                      </div>
                    </div>
                  ) : activeTab === "projects" ? (
                    <div className="w-full">
                      <motion.h3
                        className="text-2xl font-semibold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        DỰ ÁN TIÊU BIỂU
                      </motion.h3>
                      <motion.ul
                        className="list-disc pl-5 text-gray-700 space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {selectedStudent.projects.map((project, idx) => (
                          <motion.li key={idx} className="mb-4">
                            <motion.div className="font-medium mb-2">
                              {project.title}
                            </motion.div>
                            <div className="relative w-full h-48">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  ) : null}

                  {/* Nút quay lại */}
                  <motion.button
                    className="mt-8 text-blue-500 hover:underline self-start"
                    onClick={() => setSelectedStudent(null)}
                    whileHover={{ scale: 1.05 }}
                  >
                    &larr; Quay lại
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
