export default function TestIntro() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        color: "#EDEDED",
        padding: "0 16px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#3B82F6" }}>
        QIRapid — IQ Test
      </h1>
      <p style={{ maxWidth: 700, opacity: 0.85 }}>
        This is where your IQ test will begin. In the next steps, you’ll see
        multiple-choice questions designed to estimate your cognitive skills.
      </p>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "12px" }}>
        <a href="/" className="btn">← Back</a>
        <a href="/test/start" className="btn btn-primary">Start Now</a>
      </div>
    </section>
  );
}
