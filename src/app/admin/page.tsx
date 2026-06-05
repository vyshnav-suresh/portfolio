import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1 className="text-3xl font-display text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p className="text-gray-600">Welcome to your portfolio admin panel, {session.user?.name || "Admin"}!</p>
        <p className="text-gray-600 mt-2">Use the sidebar to navigate to different sections and manage your dynamic content.</p>
      </div>
    </div>
  );
}
