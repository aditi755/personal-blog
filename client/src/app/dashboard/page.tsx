import { fetchUserPosts } from "@/app/lib/posts";
import { redirect } from "next/navigation";
import DashboardClient from "@/app/components/DashboardClient";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    console.log("No token found, redirecting to login");
    redirect("/login");
  }

  try {
    const posts = await fetchUserPosts(); // Fetch user posts
    return <DashboardClient posts={posts} />; // Render DashboardClient
  } catch (error) {
    console.error("Error in Dashboard:", error);
    return <DashboardClient posts={[]} />; // Show dashboard even if fetching fails
  }
}
