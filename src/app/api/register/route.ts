import { NextRequest } from "next/server";
import { createResponse, createErrorResponse } from "../config";
import { ApiError } from "@/types/api";
import { appendToSheet, RegistrationData } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra biến môi trường
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
