
import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";
import PageHeader from "../components/ui/PageHeader";
import { useAuth } from "../context/AuthContext";

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

type LoginLocationState = {
  from?: {
    pathname?: string;
  };
};

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
};

function Login() {
  const { session, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("signin");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from =
    (location.state as LoginLocationState | null)?.from?.pathname ??
    "/dashboard";

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-500" />
          <p className="text-sm text-slate-400">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

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
        const { data, error: authError } =
          await supabase.auth.signUp({
            email,
            password: form.password,
          });

        if (authError) {
          throw authError;
        }

        if (!data.user) {
          throw new Error("Account creation failed. Please try again.");
        }

        const { error: profileError } = await supabase
          .from("agents")
          .insert({
            id: data.user.id,
            name: form.name.trim(),
            email,
            role: "agent",
          });

        if (profileError) {
          throw profileError;
        }

        setForm(initialForm);
        setSuccessMessage("Account created successfully!");

        if (data.session) {
          navigate(from, { replace: true });
        } else {
          setSuccessMessage(
            "Account created! Please confirm your email before signing in."
          );
        }
      } else {
        const { error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password: form.password,
          });

        if (authError) {
          throw authError;
        }

        setForm(initialForm);
        navigate(from, { replace: true });
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

          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M12 8v5m0 3h.01"
                  strokeLinecap="round"
                />
              </svg>

              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <p
              role="status"
              className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400"
            >
              {successMessage}
            </p>
          )}

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
