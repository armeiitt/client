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

async function sendEmail({ to, subject, text }) {
  try {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <tramy2454@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendEmail;
