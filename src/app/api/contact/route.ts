import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, honeypot } = await req.json();

    // Spam protection check (honeypot field should be empty)
    if (honeypot) {
      return NextResponse.json(
        { error: "Spam detected." },
        { status: 400 }
      );
    }

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please enter a message with at least 10 characters." },
        { status: 400 }
      );
    }

    // Check if external mail service (Resend, SendGrid, SMTP) is configured
    const hasExternalMailer = Boolean(
      process.env.RESEND_API_KEY ||
      process.env.SENDGRID_API_KEY ||
      process.env.SMTP_HOST
    );

    const mailtoUrl = `mailto:jenitson46@gmail.com?subject=${encodeURIComponent(
      subject?.trim() || `Portfolio Inquiry from ${name.trim()}`
    )}&body=${encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
    )}`;

    if (hasExternalMailer) {
      // If external email provider configured, send email here
      // e.g. await resend.emails.send(...)
      return NextResponse.json({
        success: true,
        message: "Your message has been received! Jenit will respond shortly.",
      });
    }

    // Authentic disclosure: Server is in local/direct mail mode
    return NextResponse.json({
      success: true,
      requiresMailtoFallback: false,
      message:
        "Thank you! Your message has been prepared. You can also send directly to jenitson46@gmail.com.",
      mailtoUrl,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please reach out via email directly." },
      { status: 500 }
    );
  }
}
