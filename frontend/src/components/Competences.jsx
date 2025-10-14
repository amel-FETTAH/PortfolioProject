import React from "react";
import "./Competences.css";

import uiLogo from "../assets/uilogo.png";
import webLogo from "../assets/webdesignlogo.png";
import appLogo from "../assets/appdesignlogo (2).png";
import frameworkLogo from "../assets/frameworklogo.png";

export default function Competences() {
  return (
    <section className="competences-section" id="skills">
      <h2 className="section-title">Competence</h2>
      <p className="section-subtitle">
        Des compétences techniques et créatives acquises à travers mon parcours
        académique et professionnel.
      </p>

      <div className="competences-container">
        <div className="competence-card">
          <img src={uiLogo} alt="UI/UX" className="competence-icon" />
          <h3>UI/UX</h3>
          <p>
            Création d’interfaces visuelles attrayantes et faciles à utiliser.
            Design de parcours utilisateur.
          </p>
        </div>

        <div className="competence-card">
          <img src={webLogo} alt="Web" className="competence-icon" />
          <h3>Web DEVELOPMENT</h3>
          <p>
            HTML, CSS, JavaScript et frameworks modernes. Création de sites web
            responsives.
          </p>
        </div>

        <div className="competence-card">
          <img src={appLogo} alt="App Design" className="competence-icon" />
          <h3>App Design</h3>
          <p>
            Design d’applications mobiles modernes et intuitives adaptées aux
            besoins des utilisateurs.
          </p>
        </div>

        <div className="competence-card">
          <img src={frameworkLogo} alt="Frameworks" className="competence-icon" />
          <h3>Frameworks & Outils</h3>
          <p>
            Angular, Git/GitHub, Figma et outils de développement modernes.
            Apprentissage continu via Udemy.
          </p>
        </div>
      </div>
    </section>
  );
}
