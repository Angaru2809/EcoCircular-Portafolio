import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "./firebaseConfig";

export default function LoginPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setBusy(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("firebaseToken", token);
      navigate("/company");
    } catch (e) {
      if (e?.code === "auth/popup-closed-by-user") {
        setError("Cancelado.");
      } else {
        setError("No se pudo acceder.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-layout login-layout--simple">
      <div className="card login-card">
        <h1 className="login-heading">Ingresar</h1>
        {error ? (
          <p className="feedback feedback--error" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="btn btn-primary btn-login-full"
          onClick={handleLogin}
          disabled={busy}
        >
          {busy ? "Abriendo…" : "Acceder con Google"}
        </button>
      </div>
    </div>
  );
}
