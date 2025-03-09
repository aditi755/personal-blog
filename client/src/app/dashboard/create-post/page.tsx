"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/lib/posts";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createPost({ title, content });
      router.push("/dashboard"); // Redirect to dashboard after successful post creation
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
        Create a New Post
      </h1>

      {/* Glassmorphic Form Container */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900"
            required
          />

          {/* Content Textarea */}
          <textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900 h-40"
            required
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Post"}
          </button>
        </form>
      </div>
    </main>
  );
}
