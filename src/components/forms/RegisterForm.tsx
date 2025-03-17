"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  major: z.enum(["graphic-design", "udpm", "networking", "programming"], {
    required_error: "Vui lòng chọn ngành nghề",
  }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterForm = ({ isOpen, onClose }: RegisterFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Đăng ký thành công!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Form Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-white">
                  Đăng Ký Xét Tuyển
                </h2>
                <p className="text-white/80 mt-1">
                  Vui lòng điền thông tin của bạn
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Tên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên của bạn
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nhập họ và tên"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email của bạn
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nhập email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Ngành nghề */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chọn ngành nghề
                  </label>
                  <select
                    {...register("major")}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Chọn ngành nghề</option>
                    <option value="graphic-design">Thiết kế đồ hoạ</option>
                    <option value="udpm">Công nghệ thông tin - UDPM</option>
                    <option value="networking">
                      Truyền thông và mạng máy tính
                    </option>
                    <option value="programming">Lập trình máy tính</option>
                  </select>
                  {errors.major && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.major.message}
                    </p>
                  )}
                </div>

                {/* Tin nhắn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tin nhắn của bạn (không bắt buộc)
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nhập tin nhắn (nếu có)"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegisterForm;
