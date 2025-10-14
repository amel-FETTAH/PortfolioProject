import React, { useEffect, useState } from "react";
import "./Projects.css";
import cargoFallback from "../assets/cargoprojet.png";
import siteFallback from "../assets/sitwebProject.png";

const API = "http://localhost:5000";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch(`${API}/api/projects`)
      .then(r => r.json())
      .then(data => { if (mounted) setProjects(Array.isArray(data) ? data : []); })
      .catch(err => { console.error("fetch projects", err); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => mounted = false;
  }, []);

  const fallback = [cargoFallback, siteFallback];

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">Mes Projets</h2>
      {loading && <p>Chargement...</p>}
      <div className="projects-container">
        {projects.length === 0 && (
          <>
            <div className="project-card">
              <img src={fallback[0]} alt="fallback" className="project-image" />
              <div className="project-content"><h3>Projet exemple</h3></div>
            </div>
            <div className="project-card">
              <img src={fallback[1]} alt="fallback" className="project-image" />
              <div className="project-content"><h3>Projet exemple</h3></div>
            </div>
          </>
        )}
        {projects.map((p, idx) => {
          const img = p.image ? (p.image.toLowerCase().startsWith("http") ? p.image : `${API}/public/${p.image}`) : fallback[idx % fallback.length];
          const title = p.title || p.name || `Projet ${idx+1}`;
          return (
            <div className="project-card" key={p.id || idx}>
              <img src={img} alt={title} className="project-image" onError={(e) => e.currentTarget.src = fallback[idx % fallback.length]} />
              <div className="project-content">
                <h3>{title}</h3>
                <p>{p.description}</p>
                {p.url && <a href={p.url} target="_blank" rel="noreferrer">Voir</a>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
