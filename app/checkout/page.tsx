"use client";

import React from "react";

export default function CheckoutPage() {
  async function pay() {
    const res = await fetch("/api/checkout", { method: "POST" });
    if (!res.ok) return alert("Checkout error.");
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        color: "#0c1e46",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#1d4ed8" }}>Unlock Your Result</h1>
      <p style={{ maxWidth: 520, opacity: 0.85 }}>
        Secure checkout. You’ll get instant access to your full IQ result and insights.
      </p>
      <button
        onClick={pay}
        style={{
          background: "#1d4ed8",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "12px 24px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Pay & Unlock
      </button>
      <p style={{ fontSize: 12, opacity: 0.7 }}>Powered by Stripe • Test mode</p>
    </section>
  );
}
