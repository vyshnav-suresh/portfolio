import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vyshnav Suresh | Full Stack Engineer",
  description: "Portfolio of Vyshnav Suresh, Full Stack Engineer specialising in Node.js, React, Python, and GenAI automation.",
  metadataBase: new URL("https://vyshnav.dev"),
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${dmSans.variable} ${dmSerifDisplay.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans bg-white text-gray-600 antialiased">
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 py-4 border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl flex justify-between items-center">
            <Link href="/" className="font-display text-xl tracking-tight text-primary hover:opacity-80 transition-opacity">
              Portfolio
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/#timeline" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Experience</Link>
              <Link href="/#projects" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Projects</Link>
              <Link href="/#skills" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Skills</Link>
              <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Blog</Link>
              <Link href="/#contact" className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">Get In Touch</Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button aria-label="Menu" className="p-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </nav>
        
        <main className="pt-20">
          {children}
        </main>

        <footer className="py-8 text-center border-t border-gray-200 mt-20">
          <p className="text-sm text-gray-500">&copy; 2026 Vyshnav Suresh &middot; Full Stack Engineer</p>
        </footer>
      </body>
    </html>
  );
}
