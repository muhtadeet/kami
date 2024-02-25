import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/providers/theme-provider";
import ConvexClientProvider from "@/components/ui/providers/convex-provider";
import { Toaster } from "sonner";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Kami",
  description: "The ultimate note app.",
  icons: {
    icon: [
      {
        url: "/kamiLogo.svg",
        href: "/kamiLogo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ubuntu.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="kami-theme"
          >
            <Toaster position="bottom-center" />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
