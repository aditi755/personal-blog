"use server";
import { apiRequest } from "./api";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  exp?: number;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export async function fetchPosts(): Promise<Post[]> {
  return apiRequest<Post[]>("http://localhost:8080/api/posts", {
    cache: "no-store",
  });
}

export async function fetchPost(id: string): Promise<Post> {
  return apiRequest<Post>(`http://localhost:8080/api/posts/${id}`, {
    cache: "no-store",
  });
}

export async function fetchUserPosts(): Promise<Post[]> {
  try {
    const token = cookies().get("token");
    if (!token || !token.value) throw new Error("Unauthorized: No auth token found.");

    const decoded: DecodedToken = jwtDecode<DecodedToken>(token.value);
    const authorId = decoded.id;

    return apiRequest<Post[]>(`http://localhost:8080/api/posts/author/${authorId}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

export async function createPost(postData: { title: string; content: string }) {
  try {
    const token = cookies().get("token");
    if (!token || !token.value) throw new Error("Unauthorized: No auth token found.");

    const decoded: DecodedToken = jwtDecode<DecodedToken>(token.value);
    const authorId = decoded.id;

    return apiRequest("http://localhost:8080/api/posts", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...postData, authorId }),
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
