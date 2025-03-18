"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullName: z
    .string()
    .min(1, "Vui lòng điền tên của bạn")
    .min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .min(1, "Vui lòng điền số điện thoại")
    .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
  email: z
    .string()
    .min(1, "Vui lòng điền email")
    .email("Email không đúng định dạng"),
  major: z.enum(["graphic-design", "udpm", "networking", "programming"], {
    required_error: "Vui lòng chọn ngành nghề",
  }),
  message: z.string().optional(),
});

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterForm({ isOpen, onClose }: RegisterFormProps) {
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "",
    },
    mode: "all",
    delayError: 1000,
  });

  const debouncedValidation = debounce(
    async (field: keyof z.infer<typeof formSchema>) => {
      setIsTyping((prev) => ({ ...prev, [field]: false }));
      await form.trigger(field);
    },
    1000
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name) {
        setIsTyping((prev) => ({ ...prev, [name]: true }));
        debouncedValidation(name as keyof z.infer<typeof formSchema>);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedValidation.cancel();
    };
  }, [form.watch]);

  // Hàm kiểm tra xem có nên hiển thị lỗi hay không
  const shouldShowError = (fieldName: keyof z.infer<typeof formSchema>) => {
    const hasError = form.formState.errors[fieldName];
    const isFieldTyping = isTyping[fieldName];
    return hasError && !isFieldTyping;
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // 🎉 Hiệu ứng pháo hoa khi thành công
      confetti({
        particleCount: 350,
        spread: 200,
        origin: { y: 0.6 },
      });

      // ✅ Hiển thị thông báo thành công ngay lập tức
      await Swal.fire({
        title: "Thành công!",
        text: "Thông tin đăng ký của bạn đã được tiếp nhận! Bạn hãy theo dõi Email để nhận được những thông báo mới nhất nhé",
        icon: "success",
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      // Reset form và đóng dialog
      form.reset();
      onClose();

      // Gửi dữ liệu đến server ở background
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra, vui lòng thử lại!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none bg-transparent">
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header với hiệu ứng gradient và pattern */}
            <div className="relative bg-main-gradient p-6">
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Đăng Ký Xét Tuyển
                  </DialogTitle>
                  <DialogDescription className="text-white/90 text-sm">
                    Điền thông tin để bắt đầu
                  </DialogDescription>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 bg-gradient-to-b from-white to-gray-50">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Tên của bạn
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập tên của bạn"
                              {...field}
                              className="h-10 rounded-lg border-gray-200 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-blue-300 hover:shadow-sm hover:shadow-blue-500/10"
                              onBlur={() => {
                                setIsTyping((prev) => ({
                                  ...prev,
                                  fullName: false,
                                }));
                                form.trigger("fullName");
                              }}
                              onChange={(e) => {
                                field.onChange(e);
                                setIsTyping((prev) => ({
                                  ...prev,
                                  fullName: true,
                                }));
                              }}
                            />
                          </FormControl>
                          {shouldShowError("fullName") && (
                            <FormMessage className="text-xs text-red-500 min-h-[20px]" />
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Số điện thoại
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập số điện thoại của bạn"
                              {...field}
                              className="h-10 rounded-lg border-gray-200 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-blue-300 hover:shadow-sm hover:shadow-blue-500/10"
                              onBlur={() => {
                                setIsTyping((prev) => ({
                                  ...prev,
                                  phone: false,
                                }));
                                form.trigger("phone");
                              }}
                              onChange={(e) => {
                                field.onChange(e);
                                setIsTyping((prev) => ({
                                  ...prev,
                                  phone: true,
                                }));
                              }}
                            />
                          </FormControl>
                          {shouldShowError("phone") && (
                            <FormMessage className="text-xs text-red-500 min-h-[20px]" />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập email của bạn"
                            {...field}
                            className="h-10 rounded-lg border-gray-200 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-blue-300 hover:shadow-sm hover:shadow-blue-500/10"
                            onBlur={() => {
                              setIsTyping((prev) => ({
                                ...prev,
                                email: false,
                              }));
                              form.trigger("email");
                            }}
                            onChange={(e) => {
                              field.onChange(e);
                              setIsTyping((prev) => ({ ...prev, email: true }));
                            }}
                          />
                        </FormControl>
                        {shouldShowError("email") && (
                          <FormMessage className="text-xs text-red-500 min-h-[20px]" />
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Ngành nghề
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setIsTyping((prev) => ({ ...prev, major: false }));
                            form.trigger("major");
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10 rounded-lg border-gray-200 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:border-blue-300 hover:shadow-sm hover:shadow-blue-500/10">
                              <SelectValue placeholder="Chọn ngành nghề" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="graphic-design">
                              Thiết kế đồ hoạ
                            </SelectItem>
                            <SelectItem value="udpm">
                              Công nghệ thông tin - UDPM
                            </SelectItem>
                            <SelectItem value="networking">
                              Truyền thông và mạng máy tính
                            </SelectItem>
                            <SelectItem value="programming">
                              Lập trình máy tính
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {shouldShowError("major") && (
                          <FormMessage className="text-xs text-red-500 min-h-[20px]" />
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Tin nhắn (không bắt buộc)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập tin nhắn của bạn"
                            className="resize-none rounded-lg border-gray-200 focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 min-h-[80px] bg-white/50 backdrop-blur-sm hover:border-blue-300 hover:shadow-sm hover:shadow-blue-500/10"
                            {...field}
                            onBlur={() => {
                              setIsTyping((prev) => ({
                                ...prev,
                                message: false,
                              }));
                              form.trigger("message");
                            }}
                            onChange={(e) => {
                              field.onChange(e);
                              setIsTyping((prev) => ({
                                ...prev,
                                message: true,
                              }));
                            }}
                          />
                        </FormControl>
                        {shouldShowError("message") && (
                          <FormMessage className="text-xs text-red-500 min-h-[20px]" />
                        )}
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="flex-1 h-10 cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                    >
                      <span className="relative z-10">
                        {form.formState.isSubmitting ? "Đang gửi..." : "Gửi"}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
