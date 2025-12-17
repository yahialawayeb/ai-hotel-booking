import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "./components/Navbar";
import "../globals.css";
import ChatWidget from "./components/ChatWidget";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "LuxeHotel - Premium Stays",
  description: "Experience luxury and comfort.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
