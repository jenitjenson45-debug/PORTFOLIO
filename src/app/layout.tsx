import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-jenitjenson45-debug.vercel.app"),
  title: "Jenit Jenson — Web Designer & UI/UX Designer",
  description:
    "Personal portfolio of Jenit Jenson: Web Designer and UI/UX Designer. Combining thoughtful aesthetics, intuitive interactions, and modern design systems.",
  keywords: [
    "Jenit Jenson",
    "Web Designer",
    "UI/UX Designer",
    "Digital Designer",
    "Creative Web Designer",
    "Portfolio 2026",
    "Figma",
    "Design Systems",
    "Tailwind CSS",
  ],
  authors: [{ name: "Jenit Jenson" }],
  creator: "Jenit Jenson",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/jenitjenson45-debug",
    title: "Jenit Jenson — Web Designer & UI/UX Designer",
    description:
      "I design meaningful digital experiences through thoughtful UI/UX, modern design systems and creative interactions.",
    siteName: "Jenit Jenson Portfolio",
    images: [
      {
        url: "/images/jenit-portrait.jpg",
        width: 800,
        height: 1200,
        alt: "Jenit Jenson Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenit Jenson — Digital Designer & Web Developer",
    description:
      "I design and develop meaningful digital experiences through thoughtful UI/UX, modern web technologies and creative interactions.",
    images: ["/images/jenit-portrait.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Big+Shoulders+Display:wght@400;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="bg-[#11120F] text-[#E9E3D5] font-sans antialiased overflow-x-hidden selection:bg-[#858D70] selection:text-[#11120F]">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
