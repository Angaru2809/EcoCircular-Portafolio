import React, { useEffect, useState } from "react";
import api from "./api";

export default function MaterialsPage() {
  const [companies, setCompanies] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState({
    company_id: "",
    material_type: "",
    quantity: "",
    unit: "kg",
    location: "",
    status: "available",
  });

  const loadData = async () => {
    setLoadError("");
    try {
      const [cRes, iRes] = await Promise.all([api.get("/companies/"), api.get("/materials/")]);
      setCompanies(cRes.data);
      setItems(iRes.data);
    } catch {
      setLoadError("No se pudieron cargar los datos. Revisa sesión y conexión con el API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company_id) return;
    try {
      await api.post("/materials/", form);
      setForm((f) => ({
        ...f,
        material_type: "",
        quantity: "",
        location: "",
      }));
      await loadData();
    } catch {
      setLoadError("No se pudo crear la publicación.");
    }
  };

  return (
    <>
      <header className="page-header">
        <h1>Publicaciones de material</h1>
        <p>Crea ofertas asociadas a una de tus empresas y revisa el listado actual.</p>
      </header>

      {loadError ? (
        <p className="feedback feedback--error" role="alert">
          {loadError}
        </p>
      ) : null}

      <div className="card">
        <h2 className="card__title">Nueva publicación</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="mat-company">Empresa</label>
              <select
                id="mat-company"
                name="company_id"
                value={form.company_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una empresa</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-grid form-grid--2">
              <div className="field">
                <label htmlFor="mat-type">Tipo de material</label>
                <input
                  id="mat-type"
                  name="material_type"
                  placeholder="Cartón, plástico, metal…"
                  value={form.material_type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="mat-qty">Cantidad</label>
                <input
                  id="mat-qty"
                  name="quantity"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="mat-unit">Unidad</label>
                <input
                  id="mat-unit"
                  name="unit"
                  placeholder="kg, t, unidades…"
                  value={form.unit}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="mat-loc">Ubicación</label>
                <input
                  id="mat-loc"
                  name="location"
                  placeholder="Ciudad o bodega"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: "1.25rem" }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Publicar material
            </button>
          </div>
        </form>
      </div>

      <p className="section-label">Listado</p>
      {loading ? (
        <div className="empty-state">Cargando publicaciones…</div>
      ) : items.length === 0 ? (
        <div className="empty-state">Aún no hay publicaciones. Crea la primera con el formulario.</div>
      ) : (
        <div className="materials-grid">
          {items.map((item) => (
            <article key={item.id} className="material-chip">
              <strong>{item.material_type}</strong>
              <div className="meta">
                {item.quantity} {item.unit} · {item.location}
                {item.status ? ` · ${item.status}` : ""}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
