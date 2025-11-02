"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

/** ---------- Tipos ---------- */
type Option = {
  label: string;
  text?: string;        // alternativa de texto
  svg?: React.ReactNode; // alternativa visual (SVG inline)
};

type Question = {
  text: string;
  options: Option[];
  correctIndex: number;
  kind: "text" | "visual";
};

/** ---------- SVGs ---------- */
function IconSquare({ fill = "#1d4ed8" }: { fill?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
      <rect x="8" y="8" width="32" height="32" rx="6" fill={fill} />
    </svg>
  );
}
function IconCircle({ fill = "#1d4ed8" }: { fill?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="16" fill={fill} />
    </svg>
  );
}
function IconTriangle({ fill = "#1d4ed8" }: { fill?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
      <path d="M24 8 L40 40 L8 40 Z" fill={fill} />
    </svg>
  );
}
function IconPattern() {
  return (
    <svg width="72" height="24" viewBox="0 0 72 24" aria-hidden>
      <circle cx="12" cy="12" r="8" fill="#1d4ed8" />
      <rect x="28" y="4" width="16" height="16" rx="4" fill="#1d4ed8" />
      <path d="M60 4 L68 20 L52 20 Z" fill="#1d4ed8" />
    </svg>
  );
}

/** ---------- Perguntas (mix texto + visual) ---------- */
const questions: Question[] = [
  {
    text: "What number comes next in the series: 2, 4, 8, 16, ... ?",
    kind: "text",
    options: [
      { label: "A", text: "18" },
      { label: "B", text: "24" },
      { label: "C", text: "32" },
      { label: "D", text: "28" },
    ],
    correctIndex: 2,
  },
  {
    text:
      "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies?",
    kind: "text",
    options: [
      { label: "A", text: "Yes" },
      { label: "B", text: "No" },
      { label: "C", text: "Only sometimes" },
      { label: "D", text: "Cannot be determined" },
    ],
    correctIndex: 0,
  },
  {
    text: "Choose the figure that best completes the pattern:",
    kind: "visual",
    options: [
      { label: "A", svg: <IconSquare /> },
      { label: "B", svg: <IconCircle /> }, // correta (exemplo)
      { label: "C", svg: <IconTriangle /> },
      { label: "D", svg: <IconPattern /> },
    ],
    correctIndex: 1,
  },
];

export default function StartTest() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]); // registra escolhas

  const q = questions[index];
  const total = questions.length;
  const progress = Math.round(((index + 1) / total) * 100);

  const next = () => {
    if (selected === null) return;

    const newAnswers = [...answers];
    newAnswers[index] = selected;
    setAnswers(newAnswers);

    if (index < total - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      // calcula score e navega para /test/result
      const score = newAnswers.reduce((acc, choice, i) => {
        return acc + (choice === questions[i].correctIndex ? 1 : 0);
      }, 0);

      // envia por query string
      router.push(`/test/result?score=${score}&total=${total}`);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        background: "linear-gradient(180deg, #e8f0ff 0%, #dce8ff 100%)",
        color: "#0c1e46",
        padding: "0 16px",
        textAlign: "center",
      }}
    >
      {/* Progresso */}
      <div style={{ width: "min(680px, 90vw)", textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <small style={{ opacity: 0.8 }}>
            Question {index + 1} of {total}
          </small>
          <small style={{ opacity: 0.8 }}>{progress}%</small>
        </div>
        <div
          style={{
            height: 8,
            background: "#c2d6ff",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#1d4ed8",
              transition: "width 180ms ease",
            }}
          />
        </div>
      </div>

      {/* Enunciado */}
      <h1 style={{ fontSize: "1.8rem", color: "#1d4ed8", fontWeight: 700 }}>
        {q.text}
      </h1>

      {/* Opções */}
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "1fr",
          width: "min(680px, 90vw)",
          marginTop: 6,
        }}
      >
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                justifyContent: "flex-start",
                background: isSelected ? "#1d4ed8" : "#ffffff",
                color: isSelected ? "#fff" : "#0c1e46",
                border: isSelected ? "2px solid #1d4ed8" : "1px solid #a1b5e0",
                borderRadius: 12,
                padding: "14px 18px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: isSelected
                  ? "0 4px 10px rgba(0,0,0,0.2)"
                  : "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: isSelected ? "#fff" : "#e5edff",
                  color: isSelected ? "#1d4ed8" : "#1d4ed8",
                  fontWeight: 700,
                  flex: "0 0 30px",
                }}
              >
                {opt.label}
              </span>

              {q.kind === "text" && <span>{opt.text}</span>}
              {q.kind === "visual" && (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {opt.svg}
                  <span style={{ opacity: 0.6 }}>Option {opt.label}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Ações */}
      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <a href="/" style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: 500 }}>
          ← Back
        </a>
        <button
          onClick={next}
          disabled={selected === null}
          style={{
            background: selected === null ? "#9bb7ff" : "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 22px",
            fontWeight: 600,
            cursor: selected === null ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
          }}
        >
          {index < total - 1 ? "Next →" : "Finish ✅"}
        </button>
      </div>
    </section>
  );
}
