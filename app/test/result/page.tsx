"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();

  const score = Number(params.get("score") || 0);
  const total = Number(params.get("total") || 0);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  // Mensagem simples por faixa — depois refinamos
  let label = "Keep practicing!";
  if (pct >= 85) label = "Excellent performance!";
  else if (pct >= 70) label = "Great job!";
  else if (pct >= 55) label = "Good!";
  else if (pct >= 40) label = "Fair.";

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        background: "linear-gradient(180deg, #e8f0ff 0%, #dce8ff 100%)",
        color: "#0c1e46",
        padding: "0 16px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#1d4ed8", fontWeight: 800 }}>
        Your Result
      </h1>

      <div
        style={{
          background: "#fff",
          border: "1px solid #a1b5e0",
          borderRadius: 16,
          width: "min(720px, 92vw)",
          padding: "22px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        }}
      >
        <p style={{ margin: 0, opacity: 0.85 }}>
          Score: <strong>{score}</strong> out of <strong>{total}</strong>
        </p>
        <div style={{ marginTop: 10, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <small style={{ opacity: 0.8 }}>Accuracy</small>
            <small style={{ opacity: 0.8 }}>{pct}%</small>
          </div>
          <div
            style={{
              height: 10,
              background: "#c2d6ff",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: "#22c55e",
                transition: "width 240ms ease",
              }}
            />
          </div>
        </div>

        <p style={{ marginTop: 16, fontSize: "1.1rem" }}>
          {label}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <a href="/test/start" style={btnSecondary}>↺ Retake Test</a>
        <a href="/" style={btnPrimary}>Home</a>
      </div>
    </section>
  );
}

const btnPrimary: React.CSSProperties = {
  background: "#1d4ed8",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "10px 22px",
  fontWeight: 600,
  textDecoration: "none",
};
const btnSecondary: React.CSSProperties = {
  background: "#fff",
  color: "#1d4ed8",
  border: "1px solid #1d4ed8",
  borderRadius: 10,
  padding: "10px 22px",
  fontWeight: 600,
  textDecoration: "none",
};
