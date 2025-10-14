import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 2525),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      tls: { rejectUnauthorized: false }
    });
    console.log("Verifying SMTP...");
    await transporter.verify();
    console.log("Verified OK");
    const info = await transporter.sendMail({
      from: '"Test" <from@example.com>',
      to: process.env.CONTACT_RECEIVER,
      subject: "Test Nodemailer Mailtrap",
      text: "Hello from test script"
    });
    console.log("Send info:", info);
  } catch (err) {
    console.error("Test send failed:", err);
  }
})();
