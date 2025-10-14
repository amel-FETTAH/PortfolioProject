import React from "react";
import "./Home.css";
import photo from "../assets/photo.jpeg";

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="home-container">
        {/* === Partie gauche : texte === */}
        <div className="home-text">
          <p className="intro">Hi, I'm</p>
          <h1 className="name">Amel Fettah Zahra</h1>
          <h2 className="role">Étudiante en informatique</h2>
          <p className="description">
            Passionnée par la création de solutions web modernes et créatives,
            je conçois des interfaces simples, claires et performantes.
          </p>
          <button
            className="contact-btn"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contactez-moi
          </button>
        </div>

        {/* === Partie droite : image === */}
        <div className="home-image">
          <div className="circle">
            <img src={photo} alt="Amel Fettah Zahra" />
          </div>
        </div>
      </div>
    </section>
  );
}

