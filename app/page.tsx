export default function Home() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        textAlign: "center",
        color: "#EDEDED",
        padding: "0 16px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          color: "#3B82F6",
        }}
      >
        Discover Your IQ in Minutes
      </h1>

      <p
        style={{
          fontSize: "1.25rem",
          maxWidth: "600px",
          opacity: 0.85,
        }}
      >
        Join thousands worldwide taking the QIRapid test — fast, reliable, and available in multiple languages.
      </p>

      <a href="/test/start" className="btn btn-primary" style={{ marginTop: "2rem" }}>
        Start the Test
      </a>
    </section>
  );
}
