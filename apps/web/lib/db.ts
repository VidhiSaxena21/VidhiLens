import { Pool } from "pg";
import { config } from "./config";

// Reuse connection pool across hot-reloads in dev
const globalForPg = globalThis as unknown as { pool: Pool };

export const pool =
  globalForPg.pool ??
  new Pool({ connectionString: config.DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForPg.pool = pool;