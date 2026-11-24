
import { useState } from "react";
import type { FormEvent } from "react";
import supabase from "../lib/supabaseClient";
import PageHeader from "../components/ui/PageHeader";

type AuthMode = "signup" | "signin";

type FormState = {
  name: string;
  email: string;
  password: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
};

function Login() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField(field: keyof FormState, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  }

  function changeMode(newMode: AuthMode) {
    setMode(newMode);
    setForm(initialForm);
    setErrors({});
    setErrorMessage("");
    setSuccessMessage("");
  }

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (mode === "signup" && form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    return newErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setErrorMessage("");
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const email = form.email.trim().toLowerCase();

    try {
      if (mode === "signup") {
        // Create the Supabase Auth user.
        const { data, error: authError } =
          await supabase.auth.signUp({
            email,
            password: form.password,
          });

        if (authError) {
          throw authError;
        }

        // With email confirmation disabled, Supabase returns
        // a user and an active session immediately.
        // The same user ID is used in the agents table.
        const { error: profileError } = await supabase
          .from("agents")
          .insert({
            id: data.user!.id,
            name: form.name.trim(),
            email,
            role: "agent",
          });

        if (profileError) {
          throw profileError;
        }

        // Check and display the new session.
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        console.log("Signup session:", sessionData.session);

        setSuccessMessage("Account created successfully! You are signed in.");
        setForm(initialForm);
      } else {
        // Sign in an existing user.
        const { error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password: form.password,
          });

        if (authError) {
          throw authError;
        }

        // Check and display the current session.
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        console.log("Signin session:", sessionData.session);

        setSuccessMessage("Signed in!");
        setForm(initialForm);
      }
    } catch (error) {
      console.error("Authentication error:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome"
        subtitle="Sign in to your account or create a new agent account."
      />

      <section className="mx-auto max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg sm:p-8">
        {/* Mode Toggle */}
        <div className="mb-6 grid grid-cols-2 rounded-lg bg-slate-800 p-1">
          <button
            type="button"
            onClick={() => changeMode("signin")}
            disabled={isSubmitting}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === "signin"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => changeMode("signup")}
            disabled={isSubmitting}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === "signup"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-white">
          {mode === "signup" ? "Create an account" : "Sign in"}
        </h2>

        <p className="mb-6 text-sm text-slate-400">
          {mode === "signup"
            ? "Create your support agent account."
            : "Enter your credentials to access your account."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name - Signup Only */}
          {mode === "signup" && (
            <div>
              <label
                htmlFor="agent-name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Full Name
              </label>

              <input
                id="agent-name"
                type="text"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60"
                aria-invalid={Boolean(errors.name)}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.name}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="agent-email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>

            <input
              id="agent-email"
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60"
              aria-invalid={Boolean(errors.email)}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="agent-password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="agent-password"
              type="password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              placeholder="Enter your password"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60"
              aria-invalid={Boolean(errors.password)}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
            >
              {errorMessage}
            </p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p
              role="status"
              className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400"
            >
              {successMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  className="opacity-75"
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {isSubmitting
              ? mode === "signup"
                ? "Creating account..."
                : "Signing in..."
              : mode === "signup"
                ? "Create Account"
                : "Sign In"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
