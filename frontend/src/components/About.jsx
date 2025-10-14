import React, { useEffect, useState } from "react";
import "./About.css";
import photo from "../assets/photo.jpeg"; // fallback local

const API = "http://localhost:5000";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API}/api/about`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (mounted) setAbout(data);
      })
      .catch((err) => {
        console.error("Erreur fetch about:", err);
        if (mounted) setError("Impossible de charger la section À propos.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return (
      <section className="about-section">
        <p>Chargement...</p>
      </section>
    );

  if (error)
    return (
      <section className="about-section">
        <p>{error}</p>
      </section>
    );

  // ✅ Fallback si aucun "about" trouvé
  if (!about) {
    return (
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <div className="circle-border">
              <img src={`${API}/photo.jpeg`} alt="Photo de profil" onError={(e) => (e.target.src = photo)} />
            </div>
          </div>
          <div className="about-text">
            <h2>À propos</h2>
            <p>Présentation non disponible.</p>
          </div>
        </div>
      </section>
    );
  }

  // ✅ Si des données existent
  const avatarSrc = `${API}/photo.jpeg`;

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-image">
          <div className="circle-border">
            <img src={avatarSrc} alt={about.title || "Photo"} onError={(e) => (e.target.src = photo)} />
          </div>
        </div>

        <div className="about-text">
          <h2>{about.title || "À propos de moi"}</h2>
          {about.description1 && <p>{about.description1}</p>}
          {about.description2 && <p>{about.description2}</p>}
          {about.cv_link && (
            <a
              className="cv-btn"
              href={
                about.cv_link.startsWith("http")
                  ? about.cv_link
                  : `${API}/public/${about.cv_link}`
              }
              target="_blank"
              rel="noreferrer"
            >
              Télécharger mon CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
