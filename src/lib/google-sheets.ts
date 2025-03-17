import { google } from "googleapis";
import { JWT } from "google-auth-library";

// Cấu hình credentials
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Đăng ký tư vấn";

// Khởi tạo client
const auth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

// Interface cho dữ liệu đăng ký
export interface RegistrationData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  school: string;
  major: string;
  grade: string;
  interestedProgram: string;
  message?: string;
  registrationDate: string;
}

// Hàm thêm dữ liệu vào Google Sheets
export async function appendToSheet(data: RegistrationData) {
  try {
    const values = [
      [
        data.fullName,
        data.phone,
        data.email,
        data.address,
        data.school,
        data.major,
        data.grade,
        data.interestedProgram,
        data.message || "",
        data.registrationDate,
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:J`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw error;
  }
}
