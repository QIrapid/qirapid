"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    try {
      localStorage.setItem("qr_paid", "1");
    } catch {}
    // volta pro resultado
    window.location.href = "/test/result";
  }, []);

  return null;
}
