import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { syncUserToDatabase } from "@/lib/sync-user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocLens - AI Document Analyzer",
  description: "Analyze & summarize documents with Google Gemini AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUserToDatabase();
  return (
    <>
      <ClerkProvider afterSignOutUrl="/">
        <html lang="en">
          <body className={inter.className}>
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <Header />
              {/* Main */}
              <main className="flex-1">{children}</main>
              {/* Footer */}
              <Footer />
            </div>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
