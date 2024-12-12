import localFont from "next/font/local";
import { SearchProvider } from "./search-context";
import "./globals.css";
import { AppSidebar } from "@/components/Sidebar";
import { Metadata } from "next";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "promenade.ai",
  description: "promenade ai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased h-full overflow-hidden`}
      >
        <Suspense>
          <SearchProvider>
            <div className="flex h-full">
              <AppSidebar />
              <main className="flex-1 overflow-auto ml-0 md:ml-64 bg-white h-full">
                {children}
              </main>
            </div>
          </SearchProvider>
        </Suspense>
      </body>
    </html>
  );
}
