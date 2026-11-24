
import { useState } from "react";
import type { FormEvent } from "react";
import { triageTicket } from "../lib/triage";

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

function Home() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  function setField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));

    // Clear the field's error while the user corrects it.
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
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

    if (isSaving) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      const decision = await triageTicket(
        form.subject,
        form.description
      );

      const ticket = {
        customer_name: form.name.trim(),
        customer_email: form.email.trim(),
        subject: form.subject.trim(),
        description: form.description.trim(),
      };

      console.log("Ticket:", {
        ...ticket,
        ...decision,
      });
    } catch (error) {
      console.error("Ticket submission failed:", error);
    } finally {
      setIsSaving(false);
    }
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

      {/* Submit Ticket Form */}
      <section className="mx-auto max-w-xl rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Submit a Ticket
        </h2>

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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {isSaving ? "Submitting..." : "Submit ticket"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Home;
