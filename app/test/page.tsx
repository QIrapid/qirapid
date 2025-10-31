"use client";

export default function TestIntro() {
  return (
    <section style={{ /* ...seu código igual */ }}>
      {/* conteúdo */}
    </section>
  );
}
export default function TestIntro() {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      color: '#EDEDED',
      padding: '0 16px'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#3B82F6' }}>
        QIRapid — IQ Test
      </h1>
      <p style={{ maxWidth: 700, opacity: 0.85 }}>
        This is the test area. In the next steps, we’ll add questions, progress bar, scoring, and the multi-language flow.
      </p>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px' }}>
        <a href="/" className="btn">← Back</a>
        <a href="/test/start" className="btn btn-primary">Start Now</a>
      </div>
    </section>
  );
}
