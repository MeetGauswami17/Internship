
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  // Wait until Supabase finishes checking the session.
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

  // Redirect users who are not signed in.
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AuthedRoute;
