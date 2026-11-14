import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, date, guests, type } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Name, phone number, and message are required" },
        { status: 400 }
      );
    }

    // In a production setup this sends an email/SMS/WhatsApp alert or writes to database.
    console.log("New Restaurant Enquiry/Reservation:", {
      name,
      phone,
      email,
      subject: subject || type || "General Enquiry",
      message,
      date,
      guests,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message:
        type === "table_booking"
          ? "Table reservation requested! Our concierge will call you within 15 minutes to confirm."
          : "Thank you for reaching out to ZAFFRAN. We have received your inquiry and will contact you promptly.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
