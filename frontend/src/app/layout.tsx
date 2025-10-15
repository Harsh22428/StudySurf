import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ['latin'] })
const openDyslexic = {
  fontFamily: 'OpenDyslexic, Arial, sans-serif'
}

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StudySurf - AI-Powered Learning Platform",
  description: "Transform your learning experience with AI-powered study tools designed to maximize your potential. Built for VTHacks 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
