"use client";

import React, { useEffect, useState } from "react";

export default function ResultPage() {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(false);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    try {
      const s = Number(localStorage.getItem("qr_last_score") || 0);
      const t = Number(localStorage.getItem("qr_last_total") || 0);
      const p = localStorage.getItem("qr_paid") === "1";
      setScore(Number.isFinite(s) ? s : 0);
      setTotal(Number.isFinite(t) ? t : 0);
      setPaid(p);
    } catch {}
  }, []);

  const locked = !paid;

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
          position: "relative",
          background: "#fff",
          border: "1px solid #a1b5e0",
          borderRadius: 16,
          width: "min(720px, 92vw)",
          padding: "22px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Conteúdo do resultado */}
        <div style={{ opacity: locked ? 0.25 : 1, filter: locked ? "blur(3px)" : "none", pointerEvents: locked ? "none" : "auto" }}>
          <p style={{ margin: 0, opacity: 0.85 }}>
            Score: <strong>{score}</strong> out of <strong>{total}</strong>
          </p>

          <div style={{ marginTop: 12, textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <small style={{ opacity: 0.8 }}>Accuracy</small>
              <small style={{ opacity: 0.8 }}>{pct}%</small>
            </div>
            <div style={{ height: 10, background: "#c2d6ff", borderRadius: 999, overflow: "hidden" }}>
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: pct >= 70 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444",
                  transition: "width 240ms ease",
                }}
              />
            </div>
          </div>

          <p style={{ marginTop: 16, fontSize: "1.1rem" }}>{label}</p>
        </div>

        {/* Overlay paywall */}
        {locked && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, rgba(255,255,255,0.66), rgba(255,255,255,0.9))",
            }}
          >
            <div>
              <p style={{ marginBottom: 12, fontWeight: 700 }}>
                Unlock your full IQ result
              </p>
              <a
                href="/checkout"
                style={{
                  background: "#1d4ed8",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 22px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Unlock result
              </a>
              <p style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
                Secure payment • Instant access
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <a
          href="/test/start"
          style={{
            background: "#fff",
            color: "#1d4ed8",
            border: "1px solid #1d4ed8",
            borderRadius: 10,
            padding: "10px 22px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ↺ Retake Test
        </a>
        <a
          href="/"
          style={{
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 22px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Home
        </a>
      </div>
    </section>
  );
}
