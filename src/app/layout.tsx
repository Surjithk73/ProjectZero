import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ProjectZero - AI-Powered Idea Analysis Platform",
  description: "Transform your startup and product ideas with instant, actionable insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[#0d0d11] min-h-screen`}>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
