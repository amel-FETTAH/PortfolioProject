process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ajout uniquement — Chemin absolu vers le dossier public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ajout uniquement — Sert le dossier public (photo.jpeg doit être dans backend/public/)
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// MIDDLEWARES
// ============================================

// 👉 Correction ici : CORS dynamique selon ton port front
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser sans origin (Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("CORS bloqué pour :", origin);
        return callback(new Error("Non autorisé par CORS"));
      }
    },
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

// ============================================
// CONNEXION MYSQL
// ============================================
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL :", err);
  } else {
    console.log("✅ Connecté à la base de données MySQL !");
  }
});

// ============================================
// CONFIGURATION SMTP (GMAIL)
// ============================================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Erreur SMTP :", error);
  } else {
    console.log("✅ SMTP prêt à envoyer des e-mails !");
  }
});

// ============================================
// ROUTES API PUBLIQUES
// ============================================

// Section "À propos"
app.get("/api/about", (req, res) => {
  db.query("SELECT * FROM about LIMIT 1", (err, result) => {
    if (err) {
      console.error("Erreur GET /api/about:", err);
      return res.status(500).json({ error: "Erreur base de données" });
    }
    res.json(result[0] || {});
  });
});

// Section "Compétences"
app.get("/api/skills", (req, res) => {
  db.query("SELECT * FROM skills ORDER BY order_index ASC", (err, result) => {
    if (err) {
      console.error("Erreur GET /api/skills:", err);
      return res.status(500).json({ error: "Erreur base de données" });
    }
    res.json(result);
  });
});

// Section "Projets"
app.get("/api/projects", (req, res) => {
  db.query("SELECT * FROM projects ORDER BY created_at DESC", (err, result) => {
    if (err) {
      console.error("Erreur GET /api/projects:", err);
      return res.status(500).json({ error: "Erreur base de données" });
    }
    res.json(result);
  });
});

// Section "Expériences"
app.get("/api/experiences", (req, res) => {
  db.query("SELECT * FROM experiences ORDER BY start_date DESC", (err, result) => {
    if (err) {
      console.error("Erreur GET /api/experiences:", err);
      return res.status(500).json({ error: "Erreur base de données" });
    }
    res.json(result);
  });
});

// ============================================
// ROUTE CONTACT - Formulaire
// ============================================
app.post("/send", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "name, email et message sont requis" });
  }

  const insertSql =
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";

  db.query(insertSql, [name, email, message], (dbErr, dbResult) => {
    if (dbErr) {
      console.error("Erreur insertion contact_messages:", dbErr);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement du message.",
      });
    }

    transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: `Nouveau message de ${name}`,
        html: `
          <h3>Nouveau message de contact</h3>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr>
          <p>${message}</p>
        `,
      },
      (mailErr) => {
        if (mailErr) {
          console.error("Erreur SMTP:", mailErr);
          return res.json({
            success: true,
            message:
              "Message enregistré, mais erreur lors de l'envoi de l'email.",
            emailSent: false,
          });
        }

        res.json({
          success: true,
          message: "Message enregistré et email envoyé avec succès.",
          emailSent: true,
        });
      }
    );
  });
});

// ============================================
// ROUTE DE TEST
// ============================================
app.get("/", (req, res) => {
  res.json({
    message: "Backend Portfolio API",
    status: "running",
    endpoints: [
      "GET /api/about",
      "GET /api/skills",
      "GET /api/projects",
      "GET /api/experiences",
      "POST /send",
    ],
  });
});

// ============================================
// DEMARRAGE DU SERVEUR
// ============================================
app.listen(PORT, () => {
  console.log("========================================");
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  console.log("🌐 Frontend autorisés :", allowedOrigins.join(", "));
  console.log("========================================");
});
