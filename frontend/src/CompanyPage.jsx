import React, { useState } from "react";
import api from "./api";

export default function CompanyPage() {
  const [form, setForm] = useState({
    name: "",
    nit: "",
    city: "",
    sector: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/companies/", form);
      setMsg("Empresa creada");
    } catch {
      setMsg("Error al crear empresa");
    }
  };

  return (
    <div>
      <h2>Empresa</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} />
        <input name="nit" placeholder="NIT" onChange={handleChange} />
        <input name="city" placeholder="Ciudad" onChange={handleChange} />
        <input name="sector" placeholder="Sector" onChange={handleChange} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
