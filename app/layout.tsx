import localFont from "next/font/local";
import { SearchProvider } from "./search-context";
import "./globals.css";
import { AppSidebar } from "@/components/Sidebar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased h-full`}
      >
        <SearchProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1 bg-white h-full">{children}</main>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
