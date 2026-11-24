
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import supabase from "../lib/supabaseClient";
import type { Agent } from "../types/database";

type AuthContextValue = {
  session: Session | null;
  agent: Agent | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  // Reflection: The whole app reacts to one signOut because AuthContext
  // shares the session with every useAuth() consumer. When Supabase fires
  // onAuthStateChange, the session changes, the context value updates,
  // and every component using useAuth() re-renders with the new state.

  useEffect(() => {
    let mounted = true;

    async function initializeSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      }

      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    }

    void initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadAgent() {
      if (!session) {
        setAgent(null);
        return;
      }

      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error loading agent profile:", error);
      }

      if (active) {
        setAgent((data as Agent | null) ?? null);
      }
    }

    void loadAgent();

    return () => {
      active = false;
    };
  }, [session]);

  const value: AuthContextValue = {
    session,
    agent,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
