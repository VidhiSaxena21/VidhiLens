"use client";
import { useEffect, useState } from "react";

type StatusValue = "ok" | "down" | "checking";

interface HealthResponse {
  api: "ok" | "down";
  db: "ok" | "down";
  mlService: "ok" | "down";
}

function StatusDot({ status }: { status: StatusValue }) {
  const colorClass =
    status === "ok"
      ? "bg-green-500"
      : status === "down"
      ? "bg-red-500"
      : "bg-yellow-400 animate-pulse";
  return <span className={`inline-block h-3.5 w-3.5 rounded-full ${colorClass}`} />;
}

function StatusBadge({ status }: { status: StatusValue }) {
  const textClass =
    status === "ok"
      ? "text-green-600 font-semibold"
      : status === "down"
      ? "text-red-500 font-semibold"
      : "text-yellow-600";
  return <span className={`text-sm ${textClass}`}>{status}</span>;
}

const SERVICES: { label: string; key: keyof HealthResponse }[] = [
  { label: "API  (Next.js)", key: "api" },
  { label: "Database  (PostgreSQL + pgvector)", key: "db" },
  { label: "ML Service  (FastAPI)", key: "mlService" },
];

export default function HomePage() {
  const [health, setHealth] = useState<Record<keyof HealthResponse, StatusValue>>({
    api: "checking",
    db: "checking",
    mlService: "checking",
  });
  const [lastChecked, setLastChecked] = useState<string>("");

  const checkHealth = () => {
    setHealth({ api: "checking", db: "checking", mlService: "checking" });
    fetch("/api/health")
      .then((r) => r.json())
      .then((data: HealthResponse) => {
        setHealth(data);
        setLastChecked(new Date().toLocaleTimeString());
      })
      .catch(() => {
        setHealth({ api: "down", db: "down", mlService: "down" });
        setLastChecked(new Date().toLocaleTimeString());
      });
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const allOk = Object.values(health).every((s) => s === "ok");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">⚖️ VidhiLens</h1>
        <p className="mt-2 text-gray-500 text-sm">
          Semantic Retrieval of Indian Legal Precedents
        </p>
      </div>

      {/* Health Card */}
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            System Status
          </h2>
          {allOk && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              All systems go
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {SERVICES.map(({ label, key }) => (
            <div key={key} className="flex items-center gap-3">
              <StatusDot status={health[key]} />
              <span className="flex-1 font-mono text-sm text-gray-700">{label}</span>
              <StatusBadge status={health[key]} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {lastChecked ? `Last checked: ${lastChecked}` : "Checking…"}
          </span>
          <button
            onClick={checkHealth}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Milestone badge */}
      <p className="text-xs text-gray-400">Stage 0 · Milestone M0</p>
    </main>
  );
}

