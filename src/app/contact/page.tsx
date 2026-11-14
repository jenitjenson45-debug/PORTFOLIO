"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Scroll3DZoomSection } from "@/components/common/Scroll3DZoomSection";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";
import { useToast } from "@/context/ToastContext";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();

  const [formType, setFormType] = useState<"enquiry" | "table_booking">("table_booking");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState("4 Guests");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || (!message && formType === "enquiry")) {
      toast("Please complete all required fields", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          type: formType,
          date,
          guests: formType === "table_booking" ? guests : undefined,
          message: formType === "table_booking" ? `Table reservation for ${guests} at ${time} on ${date}. Notes: ${message}` : message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast(data.message || "Request submitted successfully!", "success");
      } else {
        toast(data.error || "Failed to submit form", "error");
      }
    } catch (err) {
      toast("Network error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5]">
      <Navbar />

      <main className="pt-32 pb-24">
        <Scroll3DZoomSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
              Concierge & Reservations
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl font-black text-[#FFF4E5]">
              Get in Touch with ZAFFRAN
            </h1>
            <p className="mt-3 text-sm text-[#D8C4A8]">
              Reserve royal banquets, request outdoor catering feasts, or reach out to our dining
              directors directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left 5 Cols: Contact Information, Direct Links & Timings */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card-luxury p-7 rounded-2xl space-y-6">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                  Pavilion Direct Reach
                </h3>

                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href="tel:+919072104475"
                    className="flex items-center gap-4 p-3.5 rounded-xl glass-box-inset hover:border-[#D99A43]/60 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D99A43]/15 text-[#D99A43] flex items-center justify-center shrink-0 group-hover:bg-[#D99A43] group-hover:text-[#17110E] transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D8C4A8]/70 uppercase tracking-wider block">
                        Telephone (Direct Lines)
                      </span>
                      <span className="text-sm font-bold text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors">
                        +91 90721 04475
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919072104475?text=Hello%20ZAFFRAN%20Pavilion,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-xl glass-box-inset border-[#6F8D57]/40 hover:border-[#6F8D57] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#6F8D57]/20 text-[#6F8D57] flex items-center justify-center shrink-0 group-hover:bg-[#6F8D57] group-hover:text-white transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6F8D57] uppercase tracking-wider font-bold block">
                        WhatsApp Instant Concierge
                      </span>
                      <span className="text-sm font-bold text-[#FFF4E5]">
                        Chat Directly (+91 90721 04475)
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:dining@zaffranpavilion.com"
                    className="flex items-center gap-4 p-3.5 rounded-xl glass-box-inset hover:border-[#D99A43]/60 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D99A43]/15 text-[#D99A43] flex items-center justify-center shrink-0 group-hover:bg-[#D99A43] group-hover:text-[#17110E] transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D8C4A8]/70 uppercase tracking-wider block">
                        Corporate & Event Inquiries
                      </span>
                      <span className="text-sm font-bold text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors">
                        dining@zaffranpavilion.com
                      </span>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-3.5 rounded-xl glass-box-inset">
                    <div className="w-10 h-10 rounded-lg bg-[#D99A43]/15 text-[#D99A43] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D8C4A8]/70 uppercase tracking-wider block">
                        Location Address
                      </span>
                      <span className="text-xs text-[#FFF4E5] leading-relaxed block mt-0.5 font-medium">
                        ZAFFRAN The Grand Pavilion, Main Road, Mundur, Thrissur, Kerala — 680541
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-3.5 rounded-xl glass-box-inset">
                    <div className="w-10 h-10 rounded-lg bg-[#D99A43]/15 text-[#D99A43] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <span className="text-[10px] text-[#D8C4A8]/70 uppercase tracking-wider block">
                        Service Hours
                      </span>
                      <p className="text-white font-medium mt-0.5">
                        Mon – Fri: 11:00 AM – 11:30 PM
                      </p>
                      <p className="text-[#D99A43] font-medium">
                        Sat – Sun: 11:00 AM – 12:30 AM (Midnight)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="glass-card-luxury rounded-2xl overflow-hidden h-64 w-full relative shadow-xl">
                <iframe
                  title="Google Maps Location - Mundur, Thrissur"
                  src="https://maps.google.com/maps?q=Mundur,+Thrissur,+Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right 7 Cols: Reservation & Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel-luxury p-8 rounded-2xl shadow-2xl space-y-6">
                {/* Form Tabs */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormType("table_booking");
                      setSubmitted(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      formType === "table_booking"
                        ? "btn-skeuomorphic-gold"
                        : "glass-card-luxury text-[#D8C4A8] hover:text-white"
                    }`}
                  >
                    Table Reservation
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormType("enquiry");
                      setSubmitted(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      formType === "enquiry"
                        ? "btn-skeuomorphic-gold"
                        : "glass-card-luxury text-[#D8C4A8] hover:text-white"
                    }`}
                  >
                    General Enquiry / Feedback
                  </button>
                </div>

                {submitted ? (
                  <div className="py-14 text-center space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-[#6F8D57] mx-auto" />
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                      Request Received by Concierge
                    </h3>
                    <p className="text-xs text-[#D8C4A8] max-w-sm mx-auto leading-relaxed">
                      Thank you, {name}. Our dining manager will review your request and call you
                      at {phone} promptly to confirm details.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl glass-card-luxury text-xs font-bold text-[#D99A43]"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Tariq Mansoor"
                          className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tariq@example.com"
                          className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                        />
                      </div>

                      {formType === "table_booking" && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#D99A43]" /> Date
                            </label>
                            <input
                              type="date"
                              required
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#D99A43]" /> Guests Count
                            </label>
                            <select
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                            >
                              <option value="2 Guests (Intimate)">2 Guests (Intimate)</option>
                              <option value="4 Guests (Family)">4 Guests (Family)</option>
                              <option value="6-8 Guests (Royal Majlis)">6-8 Guests (Royal Majlis)</option>
                              <option value="10+ Guests (Grand Banquet)">10+ Guests (Grand Banquet)</option>
                            </select>
                          </div>
                        </>
                      )}

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                          {formType === "table_booking"
                            ? "Special Requests or Dietary Requirements"
                            : "Your Inquiry Message *"}
                        </label>
                        <textarea
                          rows={4}
                          required={formType === "enquiry"}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={
                            formType === "table_booking"
                              ? "e.g. High chair needed, anniversary celebration, prefer quieter corner table..."
                              : "Tell us how we can assist you..."
                          }
                          className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43] resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-skeuomorphic-gold w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-wider disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {submitting
                          ? "Submitting to Concierge..."
                          : formType === "table_booking"
                          ? "Confirm Table Reservation Request"
                          : "Send Message to Concierge"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Matching bottom gradient to flow smoothly into Footer */}
        <MatchingBottomGradient
          fromColor="transparent"
          toColor="#17110E"
          className="mt-16 h-28"
        />
        </Scroll3DZoomSection>
      </main>

      <Footer />
    </div>
  );
}
