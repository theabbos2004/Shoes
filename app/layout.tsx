import type { Metadata } from "next";
import { Geist, Rubik } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Rubik({
  variable: "--font-Rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kicks",
  description: "e-commerce site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background dark:bg-gray_2`}
      >
        <AuthProvider>
          <ThemeProvider>
            {children}
            <Toaster/>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
