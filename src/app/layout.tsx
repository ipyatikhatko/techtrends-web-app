import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/modules/common/providers/theme";
import Header from "@/modules/common/components/Header";

const chivoMono = Chivo({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "TechTrends Ukraine",
  description: "Tech jobs analytics in Ukraine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${chivoMono.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          <main className="h-[100dvh] pt-[56px] flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
