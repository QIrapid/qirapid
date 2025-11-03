"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/** ========= Tipos ========= */
type Option = { label: string; text?: string; svg?: React.ReactNode };
type Kind = "text" | "visual";
type Question = {
  id: string;
  text: string;
  kind: Kind;
  options: Option[];
  correctIndex: number;
};

/** ========= SVG helpers (visuais) ========= */
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
function IconPatternRow() {
  return (
    <svg width="120" height="24" viewBox="0 0 120 24" aria-hidden>
      <circle cx="12" cy="12" r="8" fill="#1d4ed8" />
      <rect x="40" y="4" width="16" height="16" rx="4" fill="#1d4ed8" />
      <path d="M90 4 L102 20 L78 20 Z" fill="#1d4ed8" />
    </svg>
  );
}

/** ========= Banco de perguntas (40) ========= */
const numericSeq: Question[] = [
  { id: "num-1", text: "What number comes next in the series: 2, 4, 8, 16, ... ?", kind: "text",
    options: [{label:"A",text:"18"},{label:"B",text:"24"},{label:"C",text:"32"},{label:"D",text:"28"}], correctIndex: 2 },
  { id: "num-2", text: "Complete: 1, 4, 9, 16, 25, ...", kind: "text",
    options: [{label:"A",text:"30"},{label:"B",text:"36"},{label:"C",text:"49"},{label:"D",text:"64"}], correctIndex: 1 },
  { id: "num-3", text: "Complete: 3, 6, 9, 12, 15, __", kind: "text",
    options: [{label:"A",text:"18"},{label:"B",text:"20"},{label:"C",text:"21"},{label:"D",text:"24"}], correctIndex: 0 },
  { id: "num-4", text: "Complete: 5, 10, 20, 40, __", kind: "text",
    options: [{label:"A",text:"45"},{label:"B",text:"60"},{label:"C",text:"80"},{label:"D",text:"100"}], correctIndex: 2 },
  { id: "num-5", text: "Complete: 1, 1, 2, 3, 5, 8, __", kind: "text",
    options: [{label:"A",text:"11"},{label:"B",text:"13"},{label:"C",text:"15"},{label:"D",text:"21"}], correctIndex: 1 },
  { id: "num-6", text: "Which number does not belong: 7, 14, 21, 27, 28", kind: "text",
    options: [{label:"A",text:"14"},{label:"B",text:"21"},{label:"C",text:"27"},{label:"D",text:"28"}], correctIndex: 2 },
  { id: "num-7", text: "Complete: 2, 3, 5, 7, 11, __", kind: "text",
    options: [{label:"A",text:"12"},{label:"B",text:"13"},{label:"C",text:"15"},{label:"D",text:"17"}], correctIndex: 1 },
  { id: "num-8", text: "Complete: 10, 9, 7, 4, 0, __", kind: "text",
    options: [{label:"A",text:"-1"},{label:"B",text:"-2"},{label:"C",text:"-3"},{label:"D",text:"-4"}], correctIndex: 2 },
  { id: "num-9", text: "What comes next: 1, 2, 4, 7, 11, __", kind: "text",
    options: [{label:"A",text:"14"},{label:"B",text:"16"},{label:"C",text:"17"},{label:"D",text:"18"}], correctIndex: 0 },
  { id: "num-10", text: "Complete: 81, 27, 9, 3, __", kind: "text",
    options: [{label:"A",text:"2"},{label:"B",text:"1"},{label:"C",text:"1.5"},{label:"D",text:"0"}], correctIndex: 1 },
];

const verbal: Question[] = [
  { id: "ver-1", text: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies?",
    kind:"text", options: [{label:"A",text:"Yes"},{label:"B",text:"No"},{label:"C",text:"Only sometimes"},{label:"D",text:"Cannot be determined"}], correctIndex:0 },
  { id: "ver-2", text: "All roses are flowers. Some flowers fade quickly. Therefore, some roses fade quickly.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:2 },
  { id: "ver-3", text: "No cats are birds. Some pets are cats. Therefore, some pets are not birds.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:0 },
  { id: "ver-4", text: "If A is taller than B and B is taller than C, then A is taller than C.",
    kind:"text", options: [{label:"A",text:"Always"},{label:"B",text:"Sometimes"},{label:"C",text:"Never"},{label:"D",text:"Cannot say"}], correctIndex:0 },
  { id: "ver-5", text: "All artists are creative. John is creative. Therefore John is an artist.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:2 },
  { id: "ver-6", text: "Some squares are rectangles. All rectangles have four sides. Therefore some squares have four sides.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:0 },
  { id: "ver-7", text: "If none of the keys open the door, the door remains locked.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:0 },
  { id: "ver-8", text: "All programmers like logic. Maria does not like logic. Therefore Maria is not a programmer.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:2 },
  { id: "ver-9", text: "If some birds can talk and Tweety is a bird, then Tweety can talk.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:2 },
  { id: "ver-10", text: "No triangles are circles. All circles are round. Therefore, no triangles are round.",
    kind:"text", options: [{label:"A",text:"True"},{label:"B",text:"False"},{label:"C",text:"Uncertain"},{label:"D",text:"Contradiction"}], correctIndex:1 },
];

const visuals: Question[] = [
  { id: "vis-1", text: "Choose the figure that completes the pattern:",
    kind:"visual", options: [
      {label:"A",svg:<IconSquare/>},{label:"B",svg:<IconCircle/>},{label:"C",svg:<IconTriangle/>},{label:"D",svg:<IconPatternRow/>}
    ], correctIndex:1 },
  { id: "vis-2", text: "Which figure differs from the others?",
    kind:"visual", options: [
      {label:"A",svg:<IconSquare/>},{label:"B",svg:<IconSquare/>},{label:"C",svg:<IconTriangle/>},{label:"D",svg:<IconSquare/>}
    ], correctIndex:2 },
  { id: "vis-3", text: "Pick the matching pair to continue: ● ■ ▲ — then?",
    kind:"visual", options: [
      {label:"A",svg:<IconTriangle/>},{label:"B",svg:<IconSquare/>},{label:"C",svg:<IconCircle/>},{label:"D",svg:<IconPatternRow/>}
    ], correctIndex:3 },
  { id: "vis-4", text: "Select the repeated figure:",
    kind:"visual", options: [
      {label:"A",svg:<IconCircle/>},{label:"B",svg:<IconTriangle/>},{label:"C",svg:<IconCircle/>},{label:"D",svg:<IconSquare/>}
    ], correctIndex:2 },
  { id: "vis-5", text: "Which completes the implicit sequence?",
    kind:"visual", options: [
      {label:"A",svg:<IconTriangle/>},{label:"B",svg:<IconTriangle/>},{label:"C",svg:<IconSquare/>},{label:"D",svg:<IconCircle/>}
    ], correctIndex:3 },
  { id: "vis-6", text: "Choose the figure that completes the pattern:",
    kind:"visual", options: [
      {label:"A",svg:<IconTriangle/>},{label:"B",svg:<IconCircle/>},{label:"C",svg:<IconSquare/>},{label:"D",svg:<IconPatternRow/>}
    ], correctIndex:2 },
  { id: "vis-7", text: "Which figure differs from the others?",
    kind:"visual", options: [
      {label:"A",svg:<IconSquare/>},{label:"B",svg:<IconCircle/>},{label:"C",svg:<IconSquare/>},{label:"D",svg:<IconSquare/>}
    ], correctIndex:1 },
  { id: "vis-8", text: "Pick the matching pair to continue: ● ■ ▲ — then?",
    kind:"visual", options: [
      {label:"A",svg:<IconPatternRow/>},{label:"B",svg:<IconTriangle/>},{label:"C",svg:<IconSquare/>},{label:"D",svg:<IconCircle/>}
    ], correctIndex:0 },
  { id: "vis-9", text: "Select the repeated figure:",
    kind:"visual", options: [
      {label:"A",svg:<IconSquare/>},{label:"B",svg:<IconTriangle/>},{label:"C",svg:<IconSquare/>},{label:"D",svg:<IconCircle/>}
    ], correctIndex:2 },
  { id: "vis-10", text: "Which completes the implicit sequence?",
    kind:"visual", options: [
      {label:"A",svg:<IconCircle/>},{label:"B",svg:<IconPatternRow/>},{label:"C",svg:<IconTriangle/>},{label:"D",svg:<IconSquare/>}
    ], correctIndex:1 },
];

const analogies: Question[] = [
  { id:"ana-1", text:"Sun is to day as Moon is to __", kind:"text",
    options:[{label:"A",text:"Night"},{label:"B",text:"Sky"},{label:"C",text:"Star"},{label:"D",text:"Light"}], correctIndex:0 },
  { id:"ana-2", text:"Hand is to glove as foot is to __", kind:"text",
    options:[{label:"A",text:"Sock"},{label:"B",text:"Shoe"},{label:"C",text:"Sandal"},{label:"D",text:"Boot"}], correctIndex:1 },
  { id:"ana-3", text:"Bird is to fly as fish is to __", kind:"text",
    options:[{label:"A",text:"Walk"},{label:"B",text:"Swim"},{label:"C",text:"Run"},{label:"D",text:"Jump"}], correctIndex:1 },
  { id:"ana-4", text:"Ear is to hear as eye is to __", kind:"text",
    options:[{label:"A",text:"See"},{label:"B",text:"Touch"},{label:"C",text:"Taste"},{label:"D",text:"Smell"}], correctIndex:0 },
  { id:"ana-5", text:"Fire is to hot as ice is to __", kind:"text",
    options:[{label:"A",text:"Cold"},{label:"B",text:"Heat"},{label:"C",text:"Steam"},{label:"D",text:"Water"}], correctIndex:0 },
  { id:"ana-6", text:"Strong is to weak as tall is to __", kind:"text",
    options:[{label:"A",text:"Short"},{label:"B",text:"Thin"},{label:"C",text:"Wide"},{label:"D",text:"Light"}], correctIndex:0 },
  { id:"ana-7", text:"Pen is to write as knife is to __", kind:"text",
    options:[{label:"A",text:"Cut"},{label:"B",text:"Eat"},{label:"C",text:"Hold"},{label:"D",text:"Throw"}], correctIndex:0 },
  { id:"ana-8", text:"Smile is to happy as frown is to __", kind:"text",
    options:[{label:"A",text:"Angry"},{label:"B",text:"Sad"},{label:"C",text:"Hungry"},{label:"D",text:"Excited"}], correctIndex:1 },
  { id:"ana-9", text:"Wheel is to car as wing is to __", kind:"text",
    options:[{label:"A",text:"Plane"},{label:"B",text:"Bird"},{label:"C",text:"Boat"},{label:"D",text:"Bike"}], correctIndex:0 },
  { id:"ana-10", text:"Book is to read as music is to __", kind:"text",
    options:[{label:"A",text:"Listen"},{label:"B",text:"Watch"},{label:"C",text:"Cook"},{label:"D",text:"Drive"}], correctIndex:0 },
];

/** ========= Helpers ========= */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function buildExam(): Question[] {
  const all = [...numericSeq, ...verbal, ...visuals, ...analogies]; // 40
  const shuffled = shuffleArray(all);
  return shuffled.map((q) => {
    const pairs = q.options.map((opt, idx) => ({ opt, idx }));
    const shuffledPairs = shuffleArray(pairs);
    const newOptions = shuffledPairs.map((p, i) => ({ ...p.opt, label: "ABCD"[i] }));
    const newCorrectIndex = shuffledPairs.findIndex((p) => p.idx === q.correctIndex);
    return { ...q, options: newOptions, correctIndex: newCorrectIndex };
  });
}

/** ========= Página ========= */
export default function StartTest() {
  const router = useRouter();

  // 40 perguntas e timer 20min
  const questions = useMemo(() => buildExam(), []);
  const total = questions.length;
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>(Array(total).fill(-1));

  // Mensagens de incentivo a cada 10
  const [showMotivation, setShowMotivation] = useState<string | null>(null);
  const boosts = [
    "Great pace! Keep going — your focus is paying off.",
    "Halfway vibes! Stay sharp and finish strong.",
    "You’re doing great — just a few more to unlock your result.",
    "Almost there — your result is just ahead!",
  ];

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  // Ao avançar, a cada 10 respondidas, mostra incentivo por 2.5s
  useEffect(() => {
    const answeredCount = answers.filter((a) => a >= 0).length;
    if (answeredCount > 0 && answeredCount % 10 === 0) {
      const idx = answeredCount / 10 - 1; // 0..3
      setShowMotivation(boosts[Math.min(idx, boosts.length - 1)]);
      const z = setTimeout(() => setShowMotivation(null), 2500);
      return () => clearTimeout(z);
    }
  }, [answers]);

  const q = questions[index];
  const progress = Math.round(((index + 1) / total) * 100);

  function formatMMSS(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  }

  function next() {
    if (selected === null) return;
    const copy = [...answers];
    copy[index] = selected;
    setAnswers(copy);
    if (index < total - 1) {
      setIndex(index + 1);
      setSelected(copy[index + 1] >= 0 ? copy[index + 1] : null);
    } else {
      finish(copy);
    }
  }

  function prev() {
    if (index === 0) return;
    const prevIdx = index - 1;
    setIndex(prevIdx);
    setSelected(answers[prevIdx] >= 0 ? answers[prevIdx] : null);
  }

  function finish(ans: number[] = answers) {
    const score = ans.reduce((acc, choice, i) => {
      if (choice === -1) return acc;
      return acc + (choice === questions[i].correctIndex ? 1 : 0);
    }, 0);

    // salva score/total localmente (resultado só libera após pagamento)
    try {
      localStorage.setItem("qr_last_score", String(score));
      localStorage.setItem("qr_last_total", String(total));
    } catch {}
    router.push(`/test/result`);
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "90vh",
        background: "linear-gradient(180deg, #e8f0ff 0%, #dce8ff 100%)",
        color: "#0c1e46",
        padding: "24px 16px",
        textAlign: "center",
      }}
    >
      {/* Header fixo */}
      <div
        style={{
          width: "min(900px, 94vw)",
          background: "#ffffff",
          border: "1px solid #a1b5e0",
          borderRadius: 14,
          padding: 14,
          position: "sticky",
          top: 12,
          zIndex: 10,
          boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <small style={{ opacity: 0.8 }}>
                Question {index + 1} of {total}
              </small>
              <small style={{ opacity: 0.8 }}>{progress}%</small>
            </div>
            <div style={{ height: 8, background: "#c2d6ff", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "#1d4ed8", transition: "width 180ms ease" }} />
            </div>
          </div>

          <div
            style={{
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
              color: secondsLeft <= 30 ? "#dc2626" : "#1d4ed8",
            }}
            aria-label="Countdown"
          >
            ⏱ {formatMMSS(secondsLeft)}
          </div>
        </div>
      </div>

      {/* Motivational toast */}
      {showMotivation && (
        <div
          role="status"
          style={{
            width: "min(900px, 94vw)",
            background: "#ecf2ff",
            border: "1px solid #a1b5e0",
            color: "#0c1e46",
            borderRadius: 12,
            padding: "12px 16px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            fontWeight: 600,
          }}
        >
          {showMotivation}
        </div>
      )}

      {/* Enunciado */}
      <div
        style={{
          width: "min(900px, 94vw)",
          background: "#ffffff",
          border: "1px solid #a1b5e0",
          borderRadius: 14,
          padding: "18px 18px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ fontSize: "1.35rem", color: "#1d4ed8", margin: 0 }}>{q.text}</h1>
      </div>

      {/* Opções */}
      <div style={{ width: "min(900px, 94vw)", display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
        {q.options.map((opt, i) => {
          const isSelected = (selected ?? -1) === i;
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
                textAlign: "left",
                boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.05)",
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
                  color: "#1d4ed8",
                  fontWeight: 700,
                  flex: "0 0 30px",
                }}
              >
                {"ABCD"[i]}
              </span>

              {q.kind === "text" && <span>{opt.text}</span>}
              {q.kind === "visual" && (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {opt.svg}
                  <span style={{ opacity: 0.6 }}>Option {"ABCD"[i]}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Ações */}
      <div style={{ width: "min(900px, 94vw)", display: "flex", gap: 12, justifyContent: "space-between" }}>
        <button
          onClick={prev}
          disabled={index === 0}
          style={{
            background: "#fff",
            color: "#1d4ed8",
            border: "1px solid #1d4ed8",
            borderRadius: 10,
            padding: "10px 18px",
            fontWeight: 600,
            cursor: index === 0 ? "not-allowed" : "pointer",
          }}
        >
          ← Previous
        </button>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => finish()}
            style={{
              background: "#fff",
              color: "#1d4ed8",
              border: "1px solid #1d4ed8",
              borderRadius: 10,
              padding: "10px 18px",
              fontWeight: 600,
            }}
          >
            Finish Now
          </button>
          <button
            onClick={next}
            disabled={selected === null}
            style={{
              background: selected === null ? "#9bb7ff" : "#1d4ed8",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 18px",
              fontWeight: 700,
              cursor: selected === null ? "not-allowed" : "pointer",
              minWidth: 120,
            }}
          >
            {index < total - 1 ? "Next →" : "Finish ✅"}
          </button>
        </div>
      </div>
    </section>
  );
}
