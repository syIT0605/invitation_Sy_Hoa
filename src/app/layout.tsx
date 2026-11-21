import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "@/lib/config";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: weddingConfig.siteTitle,
  description: weddingConfig.siteDescription,
  openGraph: {
    title: weddingConfig.siteTitle,
    description: weddingConfig.siteDescription,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${dancingScript.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-cream)] font-body text-stone-700">
        {children}
      </body>
    </html>
  );
}
