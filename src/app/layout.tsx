import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Tư vấn liên thông",
  description: "Trang tư vấn và đăng ký liên thông đại học",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${merriweather.variable}`}>
      {children}
      </body>
    </html>
  );
}
