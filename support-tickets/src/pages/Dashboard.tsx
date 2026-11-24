
import { useCallback, useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import type { Ticket } from "../types/database";
import PageHeader from "../components/ui/PageHeader";
import {
  CATEGORY_COLORS,
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "../data/constants";
import { TICKET_STATUS } from "../lib/triage";

// Format ticket creation time during render, not in state.
function formatCreatedAt(dateString: string) {
  const createdAt = new Date(dateString);
  const now = Date.now();
  const difference = now - createdAt.getTime();

  if (Number.isNaN(createdAt.getTime())) {
    return "Unknown";
  }

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));

  if (minutes < 60 && minutes >= 0) {
    return minutes < 1 ? "Just now" : `${minutes}m ago`;
  }

  if (hours < 24 && hours >= 0) {
    return `${hours}h ago`;
  }

  return `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;
}

function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Shared loader: used by the initial effect and Refresh button.
  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: dbError } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) {
        throw dbError;
      }

      setTickets((data ?? []) as unknown as Ticket[]);
    } catch (err) {
      console.error("Error loading tickets:", err);
      setError("Unable to load tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load tickets once when the dashboard first opens.
  useEffect(() => {
    void loadTickets();
  }, [loadTickets]);

  // Derived count: no extra state is needed.
  const openCount = tickets.filter(
    (ticket) => ticket.status === TICKET_STATUS.OPEN
  ).length;

  return (
    <div className="space-y-6">
      {/* Week 9 idea: refresh on demand; Supabase real-time subscriptions
          could be added in the future. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="Tickets"
          subtitle="Every customer problem, newest first - AI already triaged them"
        />

        <button
          type="button"
          onClick={loadTickets}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <svg
            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
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
          Refresh
        </button>
      </div>

      {/* Ticket counts */}
      <p className="text-sm text-slate-400">
        {tickets.length} tickets - {openCount} still open
      </p>

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          Loading tickets...
        </div>
      ) : error ? null : tickets.length === 0 ? (
        /* Empty state */
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 text-center">
          <div className="mb-3 text-4xl">🎫</div>
          <h2 className="text-lg font-semibold text-white">
            No tickets yet
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            No tickets have been submitted. Submit one from the home page.
          </p>
        </div>
      ) : (
        /* Tickets table */
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-slate-700 bg-slate-800/70 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-4 font-medium">Subject</th>
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 text-right font-medium">Priority</th>
                <th className="px-5 py-4 text-right font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Created</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="transition hover:bg-slate-800/50"
                >
                  <td className="px-5 py-4 font-medium text-white">
                    {ticket.subject}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-slate-200">
                      {ticket.customer_name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {ticket.customer_email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        CATEGORY_COLORS[ticket.category]
                      }`}
                    >
                      {ticket.category}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        PRIORITY_COLORS[ticket.priority]
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        STATUS_COLORS[ticket.status]
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                    {formatCreatedAt(ticket.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
