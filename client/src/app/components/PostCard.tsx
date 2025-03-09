import Link from "next/link";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    content: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post._id}`} passHref>
      <div className="group relative p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 dark:bg-gray-800 mt-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        
        {/* Content Preview */}
        <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-3 text-sm sm:text-base">
          {post.content}
        </p>

        {/* Read More Button */}
        <div className="absolute bottom-4 right-4">
          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base group-hover:underline">
            Read More →
          </span>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
      </div>
    </Link>
  );
}
