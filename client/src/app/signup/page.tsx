"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "../lib/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signupUser(email, password);
    router.push("/login"); // Redirect to login after successful signup
  };

  return (
    <div className="mt-32 h-screen">
    <div className="max-w-md mx-auto p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
  {/* Title */}
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
    Signup
  </h2>

  {/* Form */}
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    {/* Email Input */}
    <input
      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    {/* Password Input */}
    <input
      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    {/* Submit Button */}
    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition-all">
      Sign Up
    </button>
  </form>
</div>
    </div>
  );
}
