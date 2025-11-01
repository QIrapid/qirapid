"use client";
import { useState } from "react";

export default function StartTest() {
  const [question, setQuestion] = useState(1);
  const [answer, setAnswer] = useState("");

  const next = () => {
    if (question < 3) {
      setQuestion((q) => q + 1);
      setAnswer("");
    } else {
      alert("Demo finished! ✅");
    }
  };

  return (
    <section style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", height:"90vh", textAlign:"center",
      color:"#EDEDED", padding:"0 16px"
    }}>
      <h1 style={{ fontSize:"2rem", color:"#3B82F6", marginBottom:"1rem" }}>
        Question {question} of 3
      </h1>

      <p style={{ fontSize:"1.1rem", maxWidth:600, opacity:0.9, marginBottom:"1.5rem" }}>
        {question === 1 && "What number should come next in the series? 2, 4, 8, 16, ..."}
        {question === 2 && "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies?"}
        {question === 3 && "Which shape completes the sequence? (placeholder visual question)."}
      </p>

      <input
        type="text"
        placeholder="Your answer…"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{
          padding:"12px", borderRadius:"8px", border:"1px solid #555",
          background:"#222", color:"#EDEDED", textAlign:"center", marginBottom:"16px"
        }}
      />

      <div style={{ display:"flex", gap:"12px" }}>
        <a href="/" className="btn">← Back</a>
        <button className="btn btn-primary" onClick={next}>Next →</button>
      </div>
    </section>
  );
}
