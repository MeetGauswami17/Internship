
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  description: string;
};

function Home() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  function setField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(form);
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
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Description
            </label>
            <textarea
              rows={6}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe your issue in detail..."
              className="w-full resize-y rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />

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
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Submit ticket
          </button>
        </form>
      </section>
    </div>
  );
}

export default Home;
