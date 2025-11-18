import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Brak wymaganych pól." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Strona Homeshelter" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `Nowa wiadomość ze strony od: ${name}`,
      text: `
Imię i nazwisko: ${name}
Email: ${email}
Telefon: ${phone || "brak"}

Wiadomość:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json(
      { error: "Błąd podczas wysyłania wiadomości." },
      { status: 500 }
    );
  }
}
