"use client";

import { useRouter } from "next/navigation";
import { Post } from "@/app/lib/posts";
import PostCard from "./PostCard"; // Import PostCard component

interface DashboardClientProps {
  posts: Post[];
}

export default function DashboardClient({ posts }: DashboardClientProps) {
  const router = useRouter();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        Your Blog Posts
      </h1>

      {/* Create Post Button */}
      <button
        onClick={() => router.push("/dashboard/create-post")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Create Post
      </button>

      <button
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ml-4"
      >
        Home
      </button>

      {/* Display Posts Using PostCard */}
      {posts.length > 0 ? (
        <div className="mt-6 ">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4 text-center">No posts found.</p>
      )}
    </main>
  );
}
