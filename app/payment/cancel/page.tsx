export default function CancelPage() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#1d4ed8" }}>Payment canceled</h1>
      <p>Feel free to review your answers and try again anytime.</p>
      <a
        href="/test/result"
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
        Go back to result
      </a>
    </section>
  );
}
