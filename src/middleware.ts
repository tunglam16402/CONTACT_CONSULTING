import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { corsHeaders } from "./app/api/config";

export async function middleware(request: NextRequest) {
  // Xử lý CORS cho các request API
  if (request.nextUrl.pathname.startsWith("/api")) {
    // Xử lý OPTIONS request
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Thêm CORS headers cho tất cả API responses
    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
