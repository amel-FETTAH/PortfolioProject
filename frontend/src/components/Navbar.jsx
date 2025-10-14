import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logop.png"; // adapte le chemin selon ton dossier

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // referme le menu après clic sur petit écran
  };

  // ✳️ NOUVELLE FONCTION : pour télécharger ou ouvrir le CV PDF
  const handleDownloadCV = (e) => {
    e.preventDefault();

    // Chemin vers ton CV dans le dossier public/
    const CV_URL = "/Amel_Fettah_CV.pdf"; // <-- renomme si ton fichier s’appelle différemment

    // Crée un lien temporaire pour lancer le téléchargement
    const link = document.createElement("a");
    link.href = CV_URL;
    link.setAttribute("download", "Amel_Fettah_CV.pdf"); // nom du fichier téléchargé
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img src={logo} alt="Portfolio logo" />
        </div>

        {/* Icône burger (visible seulement sur petit écran) */}
        <div className="burger" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "line line1 open" : "line line1"}></div>
          <div className={isOpen ? "line line2 open" : "line line2"}></div>
          <div className={isOpen ? "line line3 open" : "line line3"}></div>
        </div>

        {/* Menu principal */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li onClick={() => scrollToSection("home")}>Accueil</li>
          <li onClick={() => scrollToSection("about")}>À propos</li>
          <li onClick={() => scrollToSection("competences")}>Compétences</li>

          <li onClick={() => scrollToSection("projects")}>Projets</li>
          <li onClick={() => scrollToSection("experience")}>Expérience</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>

        {/* Bouton CV */}
        {/* ✳️ AJOUT : on relie le bouton à la fonction handleDownloadCV */}
        <button className="cv-button" onClick={handleDownloadCV}>
          Download CV
        </button>
      </div>
    </nav>
  );
}

