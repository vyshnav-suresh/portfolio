import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Site metadata
export const metadata: Metadata = {
  title: "Vyshnav Suresh | Full Stack Developer",
  description: "Full Stack Developer passionate about building exceptional digital experiences with modern web technologies.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "TypeScript", "Node.js"],
  authors: [{ name: "Vyshnav Suresh" }],
  creator: "Vyshnav Suresh",
  publisher: "Vyshnav Suresh",
  metadataBase: new URL("https://vyshnavsuresh.tech"),
  openGraph: {
    title: "Vyshnav Suresh | Full Stack Developer",
    description: "Full Stack Developer passionate about building exceptional digital experiences with modern web technologies.",
    url: "https://vyshnavsuresh.tech",
    siteName: "Vyshnav Suresh",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vyshnav Suresh - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyshnav Suresh | Full Stack Developer",
    description: "Full Stack Developer passionate about building exceptional digital experiences with modern web technologies.",
    creator: "@vyshnav_suresh",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon?<generated>", type: "image/<generated>", sizes: "<generated>" },
    ],
    apple: [
      { url: "/apple-icon?<generated>", type: "image/<generated>", sizes: "<generated>" },
    ],
  },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono?.variable}`}
      suppressHydrationWarning
    >
     
      <body className="min-h-screen font-sans antialiased px-20">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-[#faf6ff]/80 shadow-lg backdrop-blur-[6px] z-50 py-4 px-0 border-b border-[#e3d7fa]">
  <div className="container mx-auto  flex justify-between items-center">
    <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#6c3fd1] hover:text-[#7e3ff2] transition">Vyshnav</Link>
    <div className="flex items-center">
      <div className="hidden md:flex space-x-8">
        <Link href="/about" className="font-medium text-[#2d234a] hover:text-[#6c3fd1] transition">About</Link>
        <Link href="/skills" className="font-medium text-[#2d234a] hover:text-[#6c3fd1] transition">Skills</Link>
        <Link href="/projects" className="font-medium text-[#2d234a] hover:text-[#6c3fd1] transition">Projects</Link>
        <Link href="/blog" className="font-medium text-[#2d234a] hover:text-[#6c3fd1] transition">Blog</Link>
        <Link href="/hobby" className="font-medium text-[#2d234a] hover:text-[#6c3fd1] transition">Hobby</Link>
        <Link href="/contact" className="font-medium text-[#2d234a] hover:text-[#6c3fd1] transition">Contact</Link>
      </div>
    </div>
  </div>
</nav>
        {children}
      </body>
    </html>
  );
}
