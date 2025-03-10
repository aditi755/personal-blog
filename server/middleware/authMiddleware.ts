import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// Define the structure of the user object
interface UserPayload {
  id: string;
}

// Extend the Request type to include the user property
export interface AuthRequest extends Request {
  user?: UserPayload;
}

const authMiddleware: RequestHandler = (req: AuthRequest, res: Response, next: NextFunction): void => {
 
const token = req.cookies?.token
  console.log("Received token in request:", token); // Debug log
  // Check if the token exists
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }
  
  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = { id: decoded.id }; // Attach the user payload to the request object

    next(); // Proceed to the next middleware
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: "Token expired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: "Invalid token" });
    } else {
      console.error("JWT verification error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default authMiddleware;
