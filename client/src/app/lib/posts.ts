// "use server"
// import { apiRequest } from "./api";
// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";

// interface DecodedToken {
//   id: string; // User ID
//   exp?: number; // Expiry timestamp
// }

// export interface Post {
//     _id: string;
//     title: string;
//     content: string;
//     authorId: string;
//     createdAt: string;
//   }

//   export async function fetchPosts(): Promise<Post[]> {
//     return apiRequest<Post[]>("http://localhost:8080/api/posts", {
//       cache: "no-store",
//     });
//   }

// export async function fetchPost(id: string): Promise<Post> {
//   const url = `http://localhost:8080/api/posts/${id}`;
//   console.log("Fetching post with ID:", id, "URL:", url);

//   try {
//     const response = await fetch(url);
//     console.log("Response Status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("API Error Response:", errorText);
//       throw new Error(`API Error: ${response.statusText}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     throw error;
//   }
// }


// export async function fetchUserPosts(): Promise<Post[]> {
//   try {
//     const token = cookies().get("token");

//     // Get the user ID from the token
//     let authorId: string;
//     try {
//       const decoded: DecodedToken = jwtDecode<DecodedToken>(token?.value || "");
//       authorId = decoded.id;
//     } catch (error) {
//       throw new Error("Invalid token");
//     }

//     const url = `http://localhost:8080/api/posts/author/${authorId}`;
//     const response = await fetch(url, {
//       method: "GET",
//       credentials: "include", // Important: include credentials
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch posts: ${response.status}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error in fetchUserPosts:", error);
//     throw error;
//   }
// }


// export async function createPost(postData: { title: string; content: string }) {
//   try {
//     // Get token from HTTP-only cookies
//     const token = cookies().get("token");

//     if (!token || !token.value) {
//       throw new Error("Unauthorized: No auth token found.");
//     }

//     // Decode token to get user ID
//     let authorId: string;
//     try {
//       const decoded: DecodedToken = jwtDecode<DecodedToken>(token.value);
//       authorId = decoded.id;
//     } catch (error) {
//       throw new Error("Invalid token");
//     }

//     console.log("Creating post with authorId:", authorId); // Debug log

//     const response = await fetch("http://localhost:8080/api/posts", {
//       method: "POST",
//       credentials: "include", // ✅ Ensures cookies are sent
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...postData, authorId }), // ✅ Attach user ID
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create post");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// }


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
