
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

import type { Ticket } from "../types/database";

import {
  CATEGORY_COLORS,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "../data/constants";

function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("tickets")
        .select(
          "id, customer_name, customer_email, subject, description, category, priority, status, assigned_to, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setTickets([]);
      } else {
        setTickets((data ?? []) as Ticket[]);
      }

      setLoading(false);
    };

    fetchTickets();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Agent Dashboard
      </h1>

      <p className="mt-3 text-gray-600">
        Manage customer support tickets from one place.
      </p>

      {/* Total Tickets */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-gray-500 font-medium">
          Total Tickets
        </h2>

        {loading ? (
          <p className="mt-3 text-gray-500">
            Loading tickets...
          </p>
        ) : error ? (
          <p className="mt-3 text-red-600">
            Error: {error}
          </p>
        ) : (
          <p className="mt-3 text-3xl font-bold text-indigo-600">
            {tickets.length}
          </p>
        )}
      </div>

      {/* Ticket List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Recent Tickets
        </h2>

        {loading ? (
          <p className="mt-5 text-gray-500">
            Loading ticket details...
          </p>
        ) : error ? (
          <p className="mt-5 text-red-600">
            Unable to load tickets: {error}
          </p>
        ) : tickets.length === 0 ? (
          <p className="mt-5 text-gray-500">
            No tickets found.
          </p>
        ) : (
          <div className="mt-5 grid gap-5">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ticket.subject}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Customer: {ticket.customer_name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {ticket.customer_email}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  {ticket.description}
                </p>

                {/* Category, Priority and Status Badges */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      CATEGORY_COLORS[ticket.category]
                    }`}
                  >
                    {ticket.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      PRIORITY_COLORS[ticket.priority]
                    }`}
                  >
                    {ticket.priority}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      STATUS_COLORS[ticket.status]
                    }`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
