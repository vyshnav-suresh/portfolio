import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

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
     
      <body className="min-h-screen font-sans antialiased" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm z-50 p-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <a href="/" className="text-xl font-bold">Vyshnav</a>
            <div className="flex items-center">
              <div className="hidden md:flex space-x-8">
                <a href="/about" className="hover:text-accent transition">About</a>
                <a href="/skills" className="hover:text-accent transition">Skills</a>
                <a href="/projects" className="hover:text-accent transition">Projects</a>
                <a href="/blog" className="hover:text-accent transition">Blog</a>
                <a href="/hobby" className="hover:text-accent transition">Hobby</a>
                <a href="/contact" className="hover:text-accent transition">Contact</a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
