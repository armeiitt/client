// app/api/route.js 👈🏽

import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "tramy2454@gmail.com",
    pass: "bqibiwlpcbzxxnzg",
  },
});

// To handle a POST request to /api
export async function POST(req, res) {
  const body = await req.json();
  // Do whatever you want
  async function sendEmail({ to, subject, html }) {
    try {
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <tramy2454@gmail.com>', // sender address
        to: body.to, // list of receivers
        subject: body.subject, // Subject line
        html: body.html, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      return info.messageId;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
  await sendEmail({
    to: body.to,
    subject: body.subject,
    html: body.html,
  });
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
