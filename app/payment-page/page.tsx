"use client";

export default function PaymentPage() {
  async function handleCheckout() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert("Erro ao iniciar o pagamento.");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>💡 Resultado disponível!</h1>
      <p>Para ver seu resultado completo, conclua o pagamento abaixo:</p>
      <button
        onClick={handleCheckout}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Pagar e ver resultado
      </button>
    </div>
  );
}
