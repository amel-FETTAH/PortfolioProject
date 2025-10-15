// backend/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
   host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // ✅ port dynamique (cloud ou local)
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio',
  waitForConnections: true,
  connectionLimit: 10,

  // ✅ Option SSL (utile pour MySQL Cloud)
  ssl: {
    rejectUnauthorized: true, // garde la connexion sécurisée
  },
});

export default pool;
