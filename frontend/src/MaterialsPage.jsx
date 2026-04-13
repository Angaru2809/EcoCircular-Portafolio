import React, { useEffect, useState } from "react";
import api from "./api";

export default function MaterialsPage() {
  const [companies, setCompanies] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    company_id: "",
    material_type: "",
    quantity: "",
    unit: "kg",
    location: "",
    status: "available",
  });

  useEffect(() => {
    loadCompanies();
    loadItems();
  }, []);

  const loadCompanies = async () => {
    const res = await api.get("/companies/");
    setCompanies(res.data);
  };

  const loadItems = async () => {
    const res = await api.get("/materials/");
    setItems(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/materials/", form);
    loadItems();
  };

  return (
    <div>
      <h2>Materiales</h2>

      <form onSubmit={handleSubmit}>
        <select name="company_id" onChange={handleChange}>
          <option value="">Seleccione empresa</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          name="material_type"
          placeholder="Tipo de material"
          onChange={handleChange}
        />
        <input name="quantity" placeholder="Cantidad" onChange={handleChange} />
        <input name="unit" placeholder="Unidad" onChange={handleChange} />
        <input name="location" placeholder="Ubicación" onChange={handleChange} />

        <button type="submit">Crear publicación</button>
      </form>

      <hr />

      {items.map((item) => (
        <div key={item.id}>
          <strong>{item.material_type}</strong> - {item.quantity} {item.unit} -{" "}
          {item.location}
        </div>
      ))}
    </div>
  );
}
