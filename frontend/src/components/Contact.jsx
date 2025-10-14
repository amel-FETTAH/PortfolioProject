import React, { useState } from "react";
import "./Contact.css";

const API = "http://localhost:5000";

export default function Contact() {
  // ✅ SUPPRIMÉ "subject" du state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch(`${API}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // Envoie seulement name, email, message
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        console.error("Erreur serveur:", data);
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Contact</h2>
      <form onSubmit={onSubmit} className="contact-form">
        <input 
          name="name" 
          value={form.name} 
          onChange={onChange} 
          placeholder="Nom" 
          required 
        />
        <input 
          name="email" 
          type="email" 
          value={form.email} 
          onChange={onChange} 
          placeholder="Email" 
          required 
        />
        {/* ✅ SUPPRIMÉ le champ "subject" */}
        <textarea 
          name="message" 
          value={form.message} 
          onChange={onChange} 
          placeholder="Message" 
          rows="5"
          required 
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
      
      {status === "success" && (
        <p className="success-message">✅ Message envoyé avec succès !</p>
      )}
      {status === "error" && (
        <p className="error-message">❌ Erreur lors de l'envoi. Réessayez.</p>
      )}
    </section>
  );
}