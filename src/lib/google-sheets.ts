import { google } from "googleapis";

// Định nghĩa kiểu dữ liệu đăng ký
export interface RegistrationData {
  fullName: string;
  phone: string;
  email: string;
  major: string;
  message?: string;
  registrationDate: string;
}

// Hàm chuyển đổi tên ngành nghề
function convertMajorToVietnamese(major: string): string {
  const majorMap: { [key: string]: string } = {
    "graphic-design": "Thiết kế đồ hoạ",
    udpm: "Công nghệ thông tin - UDPM",
    networking: "Truyền thông và mạng máy tính",
    programming: "Lập trình máy tính",
  };
  return majorMap[major] || major;
}

// Hàm format thời gian theo múi giờ Việt Nam
function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  // Chuyển đổi sang múi giờ Việt Nam (UTC+7)
  const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  return vnTime.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// Kiểm tra biến môi trường
if (
  !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
  !process.env.GOOGLE_PRIVATE_KEY ||
  !process.env.GOOGLE_SHEET_ID
) {
  throw new Error(
    "⚠️ Thiếu thông tin cấu hình Google API trong biến môi trường."
  );
}

// Khởi tạo Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Hàm thêm dữ liệu vào Google Sheets
export async function appendToSheet(data: RegistrationData) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'danhsachsinhviendangkylienthong'!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.fullName,
            data.phone,
            data.email,
            convertMajorToVietnamese(data.major),
            data.message || "",
            formatDateTime(data.registrationDate), // Format thời gian
          ],
        ],
      },
    });

    console.log("✅ Data appended successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi lưu dữ liệu vào Google Sheets:", error);
    throw new Error(
      "Không thể lưu dữ liệu vào Google Sheets. Vui lòng thử lại."
    );
  }
}
