# Deployment Instructions for Stockfolio Project

## Backend Deployment on Railway

1. Build the Spring Boot application jar:
   ```
   ./mvnw clean package
   ```
2. Railway will use the provided Dockerfile to build and deploy the backend.
3. Set the following environment variables in Railway:
   - `MONGODB_URI`: Your MongoDB connection string (e.g., from Railway's MongoDB plugin)
   - `SERVER_PORT`: Port for the backend server (default 8080)
   - `CORS_ALLOWED_ORIGINS`: URL of your frontend deployment on Vercel (e.g., https://your-frontend.vercel.app)
4. Deploy the project on Railway using the Docker deployment option.

## Frontend Deployment on Vercel

1. The frontend is a Next.js app with standard build scripts.
2. Push your frontend code to a Git repository connected to Vercel.
3. Vercel will automatically run `npm run build` and deploy the frontend.
4. Set any required environment variables in Vercel dashboard if needed.
5. The `vercel.json` file is included for basic configuration.

## Notes

- Ensure the backend URL is updated in the frontend environment variables or API calls to point to the Railway backend URL.
- For local development, use `.env.local` files to set environment variables for both backend and frontend.

---
