import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "./firebaseConfig";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    localStorage.setItem("firebaseToken", token);
    navigate("/company");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Ingresar con Google</button>
    </div>
  );
}
