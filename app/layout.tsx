import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MPGTOKEN",
  description: "MPGTOKEN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}   `}>
        <div className="flex flex-col min-h-screen bg-black overflow-hidden">
          <Header />
          <Toaster />
          <div className="flex-1">{children}</div>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
