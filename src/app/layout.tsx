import Header from "@/src/components/Header";
import type { Metadata } from "next";
import { Geist_Mono, Kadwa, Kanit } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const kadwa = Kadwa({
  variable: "--font-kadwa-source",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NEXUS | Academic & Industry Bridge",
  description:
    "NEXUS is a platform that connects academics and industry professionals to share knowledge and collaborate on projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${kanit.variable} ${kadwa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
