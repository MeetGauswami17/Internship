
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

function Dashboard() {
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTicketCount() {
      const { count, error } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error fetching tickets:", error.message);
        setError(error.message);
      } else {
        setTicketCount(count ?? 0);
      }

      setLoading(false);
    }

    fetchTicketCount();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Agent Dashboard
      </h1>

      <p className="mt-3 text-gray-600">
        Manage customer support tickets from one place.
      </p>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-gray-500">Total Tickets</h2>

        <p className="mt-3 text-3xl font-bold text-indigo-600">
          {loading ? "Loading..." : ticketCount}
        </p>
      </div>

      {error && (
        <p className="mt-4 text-red-600">
          Failed to fetch tickets: {error}
        </p>
      )}
    </div>
  );
}

export default Dashboard;
