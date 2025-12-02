import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ensure Node runtime (not Edge)

// POST /api/enquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Minimal validation
    const required = ["providerSlug", "providerName", "name", "email"];
    for (const k of required) {
      if (!body?.[k]) {
        return Response.json({ error: `Missing field: ${k}` }, { status: 400 });
      }
    }

    const {
      providerSlug,
      providerName,
      name,
      email,
      phone,
      service,
      message,
      preferredDate,
      // OPTIONAL: if you want to CC the provider, pass providerEmail from the form/page
      providerEmail,
    } = body;

    const html = `
      <h2>New Enquiry</h2>
      <p><b>Provider:</b> ${providerName} (${providerSlug})</p>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
      ${service ? `<p><b>Service:</b> ${service}</p>` : ""}
      ${preferredDate ? `<p><b>Preferred date:</b> ${preferredDate}</p>` : ""}
      ${message ? `<p><b>Message:</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>` : ""}
      <hr/>
      <p>Sent from ServiceHub.</p>
    `;

    // SMTP transport (Gmail, etc.) — values come from .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER, // your company inbox
      // cc: providerEmail || undefined,            // ← uncomment to CC the provider
      subject: `New enquiry: ${providerName}`,
      replyTo: email, // replying goes to the customer
      html,
    });

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("ENQUIRY_ERROR:", err?.message || err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
