// import { apiRequest } from "./api";

// export async function loginUser(email: string, password: string): Promise<boolean> {
//   try {
//     const response = await fetch("http://localhost:8080/api/auth/login", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     console.log("Login response status:", response.status); // Debug log
//     console.log("Response headers:", response.headers); // Debug log

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     const data = await response.json();
//     return true; // Return true if login was successful
//   } catch (error) {
//     console.error("Login error:", error);
//     return false;
//   }
// }

// export async function signupUser(email: string, password: string): Promise<boolean> {
//     try {
//       const response = await apiRequest<{ success: boolean }>("http://localhost:8080/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
  
//       return response.success;
//     } catch (error) {
//       console.error("Signup failed:", error);
//       return false;
//     }
//   }
  


import { apiRequest } from "./api";

export async function loginUser(email: string, password: string): Promise<boolean> {
  try {
    const response = await apiRequest<{ success: boolean }>("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.success;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

export async function signupUser(email: string, password: string): Promise<boolean> {
  try {
    const response = await apiRequest<{ success: boolean }>("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return response.success;
  } catch (error) {
    console.error("Signup failed:", error);
    return false;
  }
}
