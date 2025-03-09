import { fetchPosts } from "./lib/posts";
import PostCard from "./components/PostCard";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchPosts(); // Server-side fetch

  return (
    <main className="max-w-4xl mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Latest Blog Posts</h1>
      {/* Dashboard Button */}
      <div className="">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
        >
          Go to Dashboard
        </Link>
      </div>
    {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
    </main>
  );
}