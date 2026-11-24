
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import supabase from "../lib/supabaseClient";
import {
  triageTicket,
  TICKET_STATUS,
} from "../lib/triage";

type FormState = {
  name: string;
  email: string;
  subject: string;
  description: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  description?: string;
};

type SubmittedTicket = {
  id: string;
  subject: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  description: "",
};

function Home() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState<SubmittedTicket | null>(null);

  // Prevents two submissions before React updates the disabled button.
  const submittingRef = useRef(false);

  function setField(field: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setSubmitError("");
  }

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters.";
    }

    if (form.description.trim().length < 30) {
      newErrors.description =
        "Description must be at least 30 characters.";
    }

    return newErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submittingRef.current) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    submittingRef.current = true;
    setIsSaving(true);
    setSubmitError("");

    try {
      // First: get the AI triage decision.
      const triage = await triageTicket(
        form.subject.trim(),
        form.description.trim()
      );

      // Second: insert the ticket and retrieve its database ID.
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          customer_name: form.name.trim(),
          customer_email: form.email.trim().toLowerCase(),
          subject: form.subject.trim(),
          description: form.description.trim(),
          category: triage.category,
          priority: triage.priority,
          status: TICKET_STATUS.OPEN,
        })
        .select("id, subject")
        .single();

      if (ticketError) {
        console.error("Ticket insert failed:", ticketError);
        setSubmitError(
          "We couldn't submit your ticket right now. Please try again."
        );
        return;
      }

      if (!ticket) {
        setSubmitError(
          "We couldn't confirm your ticket. Please try again."
        );
        return;
      }

      // Third: insert the AI log using the ticket's ID.
      const { error: logError } = await supabase
        .from("ai_logs")
        .insert({
          ticket_id: ticket.id,
          ai_category: triage.category,
          ai_priority: triage.priority,
          ai_reasoning: triage.reasoning,
        });

      // The ticket exists even if the AI log insert fails.
      if (logError) {
        console.error("AI log insert failed:", logError);
      }

      // Fourth: show confirmation and reset the form.
      setSubmitted({
        id: ticket.id,
        subject: ticket.subject,
      });

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        "Something went wrong while submitting your ticket. Please try again."
      );
    } finally {
      submittingRef.current = false;
      setIsSaving(false);
    }
  }

  function handleNewTicket() {
    setForm(initialForm);
    setErrors({});
    setSubmitError("");
    setSubmitted(null);
  }

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-white">
          How can we help you?
        </h1>
        <p className="mt-3 text-slate-400">
          Submit a support ticket and our team will get back to you.
        </p>
      </section>

      {/* Confirmation replaces the form after a successful ticket insert */}
      {submitted ? (
        <section className="mx-auto max-w-xl rounded-xl border border-green-700/50 bg-slate-900 p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-3xl text-green-400">
            ✓
          </div>

          <h2 className="text-2xl font-semibold text-white">
            Ticket submitted successfully!
          </h2>

          <p className="mt-3 break-words text-lg font-medium text-slate-200">
            {submitted.subject}
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Our AI is reviewing your ticket - you will see its category
            and priority on the confirmation shortly.
          </p>

          <button
            type="button"
            onClick={handleNewTicket}
            className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Submit another ticket
          </button>

          <p className="mt-4 break-all text-xs text-slate-500">
            Ticket ID: {submitted.id}
          </p>
        </section>
      ) : (
        <section className="mx-auto max-w-xl rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Submit a Ticket
          </h2>

          {submitError && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400"
            >
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setField("subject", e.target.value)}
                placeholder="What do you need help with?"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Description
              </label>
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  setField("description", e.target.value)
                }
                placeholder="Describe your issue in detail..."
                className="w-full resize-y rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description}
                </p>
              )}

              <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
                <span>
                  The more detail you give, the better the AI can triage.
                </span>
                <span>{form.description.length} characters</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {isSaving ? "Submitting..." : "Submit ticket"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default Home;
