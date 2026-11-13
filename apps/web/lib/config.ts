import { z } from "zod";

const Env = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  ML_SERVICE_URL: z.string().min(1).default("http://localhost:8000"),
});

// This runs server-side only (API routes, Server Components)
export const config = Env.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ML_SERVICE_URL: process.env.ML_SERVICE_URL,
});
