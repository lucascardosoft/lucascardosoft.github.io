import type { Metadata } from "next";
// Self-hosted fonts (no runtime Google Fonts fetch — more reliable for
// builds without outbound access to fonts.googleapis.com).
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { LanguageProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: "Lucas Cardoso — Product Designer",
  description:
    "Product designer working across enterprise SaaS, healthcare, AI-powered products, accessibility, and data visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <div className="axis-grid" aria-hidden="true" />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
