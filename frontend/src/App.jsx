import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import CompanyPage from "./CompanyPage";
import LoginPage from "./LoginPage";
import MaterialsPage from "./MaterialsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-nav">
          <NavLink to="/login" className="app-nav__brand" end>
            <span aria-hidden />
            Ecored Circular
          </NavLink>
          <nav className="app-nav__links" aria-label="Principal">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "app-nav__link--active" : undefined
              }
            >
              Ingreso
            </NavLink>
            <NavLink
              to="/company"
              className={({ isActive }) =>
                isActive ? "app-nav__link--active" : undefined
              }
            >
              Empresa
            </NavLink>
            <NavLink
              to="/materials"
              className={({ isActive }) =>
                isActive ? "app-nav__link--active" : undefined
              }
            >
              Materiales
            </NavLink>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
