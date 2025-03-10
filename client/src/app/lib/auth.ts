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
