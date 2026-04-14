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
  const [msgKind, setMsgKind] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgKind("");
    try {
      await api.post("/companies/", form);
      setMsg("Empresa creada correctamente.");
      setMsgKind("success");
      setForm({ name: "", nit: "", city: "", sector: "" });
    } catch {
      setMsg("No se pudo crear la empresa. ¿Estás autenticada y el backend activo?");
      setMsgKind("error");
    }
  };

  return (
    <>
      <header className="page-header">
        <h1>Tu empresa</h1>
        <p>Registra los datos básicos. Solo verás las empresas vinculadas a tu cuenta.</p>
      </header>

      <div className="card">
        <h2 className="card__title">Datos de la empresa</h2>
        {msg ? (
          <p
            className={`feedback ${msgKind === "success" ? "feedback--success" : "feedback--error"}`}
            role="status"
          >
            {msg}
          </p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="company-name">Nombre comercial</label>
              <input
                id="company-name"
                name="name"
                placeholder="Ej. Reciclajes del Norte"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="company-nit">NIT</label>
              <input
                id="company-nit"
                name="nit"
                placeholder="Sin guiones"
                value={form.nit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="company-city">Ciudad</label>
              <input
                id="company-city"
                name="city"
                placeholder="Ciudad principal"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="company-sector">Sector</label>
              <input
                id="company-sector"
                name="sector"
                placeholder="Ej. Manufactura, retail…"
                value={form.sector}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: "1.25rem" }}>
            <button type="submit" className="btn btn-primary">
              Guardar empresa
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
