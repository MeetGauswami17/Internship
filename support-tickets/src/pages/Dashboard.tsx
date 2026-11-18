
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

function Dashboard() {
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketCount = async () => {
      setLoading(true);
      setError(null);

      const { count, error } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true });

      if (error) {
        setError(error.message);
        setTicketCount(null);
      } else {
        setTicketCount(count ?? 0);
      }

      setLoading(false);
    };

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
        <h2 className="text-gray-500 font-medium">
          Total Tickets
        </h2>

        {loading ? (
          <p className="mt-3 text-gray-500">Loading tickets...</p>
        ) : error ? (
          <p className="mt-3 text-red-600">
            Error: {error}
          </p>
        ) : (
          <p className="mt-3 text-3xl font-bold text-indigo-600">
            {ticketCount}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
