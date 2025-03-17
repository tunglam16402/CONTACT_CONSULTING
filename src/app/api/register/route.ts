import { NextRequest } from "next/server";
import { createResponse, createErrorResponse } from "../config";
import { ApiError } from "@/types/api";
import { appendToSheet, RegistrationData } from "@/lib/google-sheets";

// Validate dữ liệu đăng ký
function validateRegistrationData(data: Partial<RegistrationData>): string[] {
  const errors: string[] = [];

  if (!data.fullName?.trim()) {
    errors.push("Họ và tên là bắt buộc");
  }

  if (!data.phone?.trim()) {
    errors.push("Số điện thoại là bắt buộc");
  } else if (!/^[0-9]{10}$/.test(data.phone)) {
    errors.push("Số điện thoại không hợp lệ");
  }

  if (!data.email?.trim()) {
    errors.push("Email là bắt buộc");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email không hợp lệ");
  }

  if (!data.address?.trim()) {
    errors.push("Địa chỉ là bắt buộc");
  }

  if (!data.school?.trim()) {
    errors.push("Trường học là bắt buộc");
  }

  if (!data.major?.trim()) {
    errors.push("Chuyên ngành là bắt buộc");
  }

  if (!data.grade?.trim()) {
    errors.push("Khóa học là bắt buộc");
  }

  if (!data.interestedProgram?.trim()) {
    errors.push("Chương trình quan tâm là bắt buộc");
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate dữ liệu
    const validationErrors = validateRegistrationData(body);
    if (validationErrors.length > 0) {
      throw new ApiError(validationErrors.join(", "), 400, "VALIDATION_ERROR");
    }

    // Chuẩn bị dữ liệu
    const registrationData: RegistrationData = {
      ...body,
      registrationDate: new Date().toISOString(),
    };

    // Lưu vào Google Sheets
    await appendToSheet(registrationData);

    return createResponse(
      {
        message: "Đăng ký thành công!",
        data: registrationData,
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return createErrorResponse(error as Error);
  }
}
