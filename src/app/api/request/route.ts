// src/app/api/request/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const data = Object.fromEntries(form.entries()) as Record<string, string>;

    const {
      name = "",
      email = "",
      phone = "",
      subject = "",
      company = "",
      date = "",
      message = "",
    } = data;

    // ---- Where to send / From who (matches the ENV you pasted) ----
    const TO = process.env.MAIL_TO || process.env.CONTACT_TO || process.env.SMTP_TO;
    const FROM = process.env.MAIL_FROM || process.env.CONTACT_FROM || process.env.SMTP_USER;

    if (!TO) return NextResponse.json({ error: "MAIL_TO env not set" }, { status: 500 });

    // ---- Build message ----
    const title = `New enquiry from ${name || email}`;
    const tableRow = (k: string, v: string) =>
      `<tr><td style="padding:4px 8px"><b>${k}</b></td><td style="padding:4px 8px">${escapeHtml(v)}</td></tr>`;

    const html =
      `<h2>${title}</h2><table>` +
      tableRow("Name", name) +
      tableRow("Email", email) +
      tableRow("Phone", phone) +
      tableRow("Company", company) +
      tableRow("Subject", subject) +
      tableRow("Preferred date", date) +
      tableRow("Message", message) +
      `</table>`;

    const text =
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n` +
      `Subject: ${subject}\nPreferred date: ${date}\n\nMessage:\n${message}`;

    // ---- SMTP via Gmail (your ENV) ----
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: (process.env.SMTP_SECURE || "").toLowerCase() === "true" || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: FROM || process.env.SMTP_USER,
      to: TO,
      subject: title,
      text,
      html,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to send" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
