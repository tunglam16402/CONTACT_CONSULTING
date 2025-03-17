import { NextRequest } from "next/server";
import { createResponse, createErrorResponse } from "../config";
import { ApiError } from "@/types/api";
import { appendToSheet, RegistrationData } from "@/lib/google-sheets";

// Validate dữ liệu đăng ký
function validateRegistrationData(data: Partial<RegistrationData>): string[] {
  const errors: string[] = [];

  if (!data.fullName?.trim()) errors.push("Họ và tên là bắt buộc");

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

  if (!data.major?.trim()) errors.push("Chuyên ngành là bắt buộc");

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra biến môi trường trước khi xử lý
    if (
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      throw new ApiError(
        "Thiếu thông tin Google API trong biến môi trường.",
        500,
        "ENV_ERROR"
      );
    }

    const body = await request.json();
    console.log("📩 Received data:", body);

    // Validate dữ liệu
    const validationErrors = validateRegistrationData(body);
    if (validationErrors.length > 0) {
      throw new ApiError(validationErrors.join(", "), 400, "VALIDATION_ERROR");
    }

    // Chuẩn bị dữ liệu đăng ký
    const registrationData: RegistrationData = {
      ...body,
      registrationDate: new Date().toISOString(),
    };

    console.log("✅ Prepared data:", registrationData);

    // Ghi dữ liệu vào Google Sheets
    await appendToSheet(registrationData);

    return createResponse(
      {
        message: "Thông tin đăng ký của bạn đã được tiếp nhận!",
        data: registrationData,
      },
      201
    );
  } catch (error) {
    console.error(
      "❌ Registration error:",
      error instanceof Error ? error.message : error
    );

    // Xử lý lỗi từ Google API
    if (error instanceof ApiError) {
      return createErrorResponse(error);
    } else {
      return createErrorResponse(
        new ApiError(
          "Lỗi không xác định, vui lòng thử lại.",
          500,
          "UNKNOWN_ERROR"
        )
      );
    }
  }
}
