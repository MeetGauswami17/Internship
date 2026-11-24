
import { useEffect } from "react";
import supabase from "../lib/supabaseClient";
import PageHeader from "../components/ui/PageHeader";

function Login() {
  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      console.log("Current session:", data);

      if (error) {
        console.error("Auth connection error:", error);
      }
    }

    void checkSession();
  }, []);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <PageHeader
        title="Login"
        subtitle="Authentication setup and session testing"
      />

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Authentication
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Supabase authentication is being configured. The current
          session is temporarily checked in the browser console.
        </p>
      </div>
    </div>
  );
}

export default Login;
