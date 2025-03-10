import { fetchPosts } from "./lib/posts";
import PostCard from "./components/PostCard";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchPosts(); // Server-side fetch

  return (
    <main className="max-w-4xl mx-auto p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          Latest Blog Posts
        </h1>
        {/* Login & Signup Buttons */}
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Dashboard Button */}
      <div className="mb-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Blog Posts */}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  );
}