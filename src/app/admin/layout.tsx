import AuthProvider from "@/components/AuthProvider";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, BookOpen, LogOut } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Vyshnav Suresh",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col pt-24">
          <div className="mb-8">
            <h2 className="text-xl font-display text-primary">Admin Panel</h2>
          </div>
          <nav className="flex flex-col space-y-2 flex-grow">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-light-blue hover:text-primary transition-colors">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/projects" className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-light-blue hover:text-primary transition-colors">
              <FolderKanban size={20} />
              <span>Projects</span>
            </Link>
            <Link href="/admin/blog" className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-light-blue hover:text-primary transition-colors">
              <BookOpen size={20} />
              <span>Blog Posts</span>
            </Link>
          </nav>
          
          <div className="mt-auto">
            <Link href="/api/auth/signout" className="flex items-center space-x-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={20} />
              <span>Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 pt-24">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
