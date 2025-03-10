# Personal Blog Platform

A full-stack personal blog platform where users can sign up, log in, and post articles. Users can also view all posts and filter them by author. The backend is built with **Node.js, Express and Typescript**, while the frontend uses **Next.js 14 with TypeScript**.

## Features

### Backend (Node.js/Express)
- **Authentication**: Secure JWT-based authentication with hashed passwords using HTTP only cookie.
- **API Endpoints**:
  - `POST /api/auth/signup` -> signup endpoint
  - `POST /api/auth/login` -> login endpoint
  - `GET /api/posts` -> Public route, anyone can fetch all posts.
  - `GET /api/posts/author/:authorId` -> to fetch specific author posts.
  - `GET /api/posts/:id` -> to get a single post by its id.
  - `POST /api/posts` -> Only logged-in users can create a post
- **Data Models**:
  - **User**: `id, email, passwordHash`
  - **Post**: `id, title, content, authorId, createdAt`

### Frontend (Next.js 14 & TypeScript)
- **Pages**:
  - `/` → Homepage (Lists all blog posts).
  - `/login` → User login page.
  - `/signup` → User signup page.
  - `/dashboard` → Private route where logged-in users can post articles and view their own posts.
  - `/dashboard/create-post` -> The route that lets the users create a post with title and content.
  - `/post/[postId]` -> To see the specific posts. 
- **Optimized Rendering**:
  - Uses **server-side rendering (SSR)** for the homepage.
  - Uses **static generation (SSG)** for blog posts.
- **User Experience**:
  - Client-side routing and protected routes.
  - Responsive and clean UI using tailwind CSS and styled UI components.

---

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, React
- **Backend**: Node.js, Express.js, Typescript
- **Database**: MongoDB (with Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

---

## Installation & Setup

### Clone the Repository
```sh
git clone https://github.com/yourusername/personal-blog.git
cd personal-blog
cd server
npm install
```
### Create a .env.local file in the server folder:
```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the backend
```sh
npm run start:dev
```

### To run the frontend
```sh
cd ../client
npm install
npm run dev
```


