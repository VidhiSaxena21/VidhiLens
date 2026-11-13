import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { config } from "@/lib/config";

export async function GET() {
  // Check database
  let dbStatus = "ok";
  try {
    await pool.query("SELECT 1");
  } catch {
    dbStatus = "down";
  }

  // Check ml-service
  let mlStatus = "ok";
  try {
    const res = await fetch(`${config.ML_SERVICE_URL}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) mlStatus = "down";
  } catch {
    mlStatus = "down";
  }

  return NextResponse.json({
    api: "ok",
    db: dbStatus,
    mlService: mlStatus,
  });
}