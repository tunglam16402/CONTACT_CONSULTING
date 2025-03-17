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
            data.major,
            data.message || "",
            data.registrationDate,
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
