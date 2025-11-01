"use client";
import { useState } from "react";

type Question = {
  text: string;
  options: string[];
  correctIndex: number; // usaremos depois para pontuação
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
      // Próxima etapa: iremos calcular score e mostrar resultado.
      alert("Demo finished! Next step: scoring & result page.");
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        color: "#EDEDED",
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
            background: "#1f2430",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#3B82F6",
              transition: "width 180ms ease",
            }}
          />
        </div>
      </div>

      {/* Enunciado */}
      <h1 style={{ fontSize: "1.6rem", color: "#3B82F6" }}>{q.text}</h1>

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
              className="btn"
              style={{
                justifyContent: "flex-start",
                gap: 10,
                background: isSelected ? "#1f4c99" : "#111319",
                border: "1px solid #1f2430",
                padding: "14px 16px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  width: 28,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  background: isSelected ? "#3B82F6" : "#1f2430",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {"ABCD"[i]}
              </span>
              <span style={{ opacity: 0.95 }}>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Ações */}
      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <a href="/" className="btn">← Back</a>
        <button
          className="btn btn-primary"
          onClick={next}
          disabled={selected === null}
          style={{ opacity: selected === null ? 0.6 : 1 }}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
