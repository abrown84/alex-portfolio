import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Alex Brown | Developer & Creator",
  description: "Personal portfolio of Alex Brown - Developer, Creator, and Tech Enthusiast",
  keywords: ["developer", "portfolio", "web development", "react", "nextjs"],
  authors: [{ name: "Alex Brown" }],
  openGraph: {
    title: "Alex Brown | Developer & Creator",
    description: "Personal portfolio of Alex Brown - Developer, Creator, and Tech Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
