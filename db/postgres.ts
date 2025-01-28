import { Pool } from "pg";

export const sql = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 1,                          // Use a small pool size
  idleTimeoutMillis: 10000,         // Close idle connections faster
  connectionTimeoutMillis: 2000,    // Timeout after 2 seconds if connection can't be made
  keepAlive: true,                  // Keep connection alive for reuse in the same invocation
});
