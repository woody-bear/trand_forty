import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "트렌드포티 - 40대를 위한 트렌드 사전",
  description:
    "대화에서 뒤처지지 않도록! 최신 트렌드를 40대 눈높이로 짧고 깔끔하게 설명해 드립니다.",
  openGraph: {
    title: "트렌드포티 - 40대를 위한 트렌드 사전",
    description:
      "대화에서 뒤처지지 않도록! 최신 트렌드를 40대 눈높이로 짧고 깔끔하게 설명해 드립니다.",
    siteName: "트렌드포티",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen" style={{ fontFamily: "var(--font-pretendard)" }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
