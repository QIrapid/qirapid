"use client";
import { useState } from "react";

type Question = {
  text: string;
  options: string[];
  correctIndex: number;
};

const questions: Question[] = [
  {
    text: "What number comes next in the series: 2, 4, 8, 16, ... ?",
    options: ["18", "24", "32", "28"],
    correctIndex: 2,
  },
  {
    text: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies?",
    options: ["Yes", "No", "Only sometimes", "Cannot be determined"],
    correctIndex: 0,
  },
  {
    text: "Choose the figure that best completes the pattern (placeholder visual).",
    options: ["A", "B", "C", "D"],
    correctIndex: 1,
  },
];

export default function StartTest() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const q = questions[index];
  const total = questions.length;
  const progress = Math.round(((index + 1) / total) * 100);

  const next = () => {
    if (selected === null) return;
    if (index < total - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      alert("Demo finished! Next step: scoring & result page.");
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
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
                gap: 10,
                justifyContent: "flex-start",
                background: isSelected ? "#1d4ed8" : "#ffffff",
                color: isSelected ? "#fff" : "#0c1e46",
                border: isSelected ? "2px solid #1d4ed8" : "1px solid #a1b5e0",
                borderRadius: 12,
                padding: "14px 18px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: isSelected ? "0 4px 10px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
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
                }}
              >
                {"ABCD"[i]}
              </span>
              <span>{opt}</span>
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
          Next →
        </button>
      </div>
    </section>
  );
}
