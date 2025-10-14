// Experience.jsx
import React, { useEffect, useState } from "react";
import "./Experience.css";

const API = "http://localhost:5000";

export default function Experience() {
  const [exps, setExps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API}/api/experiences`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (mounted) setExps(data || []);
      })
      .catch((err) => {
        console.error("Erreur fetch experiences:", err);
        if (mounted) setError("Impossible de charger les expériences.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <section className="experience-section" id="experience">
      <h2 className="title">Mes expériences</h2>
      <p className="subtitle">
        Participation à des hackathons et événements tech. Expérience en développement et travail d'équipe.
      </p>

      {loading && <p>Chargement des expériences...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="experience-list">
        {!loading && exps.length === 0 && <p>Aucune expérience enregistrée.</p>}
        {exps.map((e) => (
          <div key={e.id} className="experience-card">
            <h3>{e.role || "Rôle non précisé"}</h3>
            <div className="experience-meta">
              <strong>{e.company || "Entreprise"}</strong>
              <span>
                {e.start_date ? new Date(e.start_date).toLocaleDateString() : ""}
                {e.end_date ? ` — ${new Date(e.end_date).toLocaleDateString()}` : " — Présent"}
              </span>
            </div>
            {e.description && <p>{e.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
