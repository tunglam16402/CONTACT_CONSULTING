import { NextResponse } from "next/server";
import { ApiResponse, ApiError } from "@/types/api";

// Cấu hình CORS
export const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGINS || "*"
      : "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400", // 24 hours
};

// Middleware xử lý CORS
export async function corsMiddleware(request: Request) {
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }
}

// Cấu hình response mặc định
export const createResponse = <T>(
  data: T,
  status: number = 200,
  metadata?: ApiResponse["metadata"]
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      data,
      timestamp: new Date().toISOString(),
      metadata,
    },
    {
      status,
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
};

// Cấu hình error response
export const createErrorResponse = (
  error: Error | ApiError,
  status: number = 500
): NextResponse<ApiResponse> => {
  const isApiError = error instanceof ApiError;
  const errorMessage = isApiError ? error.message : "Internal Server Error";
  const errorCode = isApiError ? error.code : undefined;
  const statusCode = isApiError ? error.statusCode : status;

  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      code: errorCode,
      timestamp: new Date().toISOString(),
    },
    {
      status: statusCode,
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
};

// Cấu hình rate limiting
export const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
};

// Cấu hình validation
export const validationConfig = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

// Cấu hình file upload
export const uploadConfig = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};
