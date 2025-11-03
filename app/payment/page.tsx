"use client";

export default function PaymentPage() {
  async function handleCheckout() {
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert(data?.error || "Erro ao iniciar o pagamento.");
      }
    } catch (e) {
      alert("Falha ao contatar o servidor de pagamento.");
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "80px auto", padding: 24, textAlign: "center" }}>
      <h1>🎯 Resultado completo disponível</h1>
      <p style={{ opacity: 0.8 }}>
        Pague uma única vez para desbloquear seu relatório detalhado com QI
        estimado, percentil, explicações por categoria e plano de evolução.
      </p>
      <button
        onClick={handleCheckout}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 10,
          fontSize: 18,
          cursor: "pointer",
          marginTop: 16,
        }}
      >
        Pagar e ver resultado
      </button>
    </div>
  );
}
