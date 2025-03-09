import { fetchPosts, fetchPost } from "@/app/lib/posts";

export async function generateStaticParams() {
  const posts = await fetchPosts(); // Fetch all posts to get their IDs
  return posts.map((post) => ({ id: post._id })); // Generate params for SSG
}

export const revalidate = 60; // Enable ISR (page updates every 60 sec)

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id); // Fetch post data at build time

  if (!post)
    return (
      <p className="text-center text-gray-600 dark:text-gray-400 mt-10 text-lg">
        Post not found 😢
      </p>
    );

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Glassmorphic Post Container */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        {/* Post Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {/* Post Content */}
        <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.content}
        </div>
      </div>
    </main>
  );
}
