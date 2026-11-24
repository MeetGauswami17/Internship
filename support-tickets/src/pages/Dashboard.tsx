
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import type { Ticket } from "../types/database";
import PageHeader from "../components/ui/PageHeader";

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

      const { data, error: dbError } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) {
        setError(dbError.message);
        setTickets([]);
      } else if (data) {
        setTickets(data as unknown as Ticket[]);
      }

      setLoading(false);
    };

    fetchTickets();
  }, []);

  return (
    <div className="w-full">

      {/* Page Header */}
      <PageHeader
        title="Tickets"
        subtitle="Every customer problem, newest first - AI already triaged them."
      />

      {/* Ticket Count */}
      {!loading && !error && (
        <p className="mb-6 text-sm text-slate-400">
          <span className="font-semibold text-indigo-400">
            {tickets.length}
          </span>{" "}
          open tickets
        </p>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500"></div>

          <p className="mt-4 text-sm text-slate-400">
            Loading tickets...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
          <h2 className="font-semibold text-red-400">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-red-300">
            Unable to load tickets: {error}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && tickets.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">

          <div className="text-5xl">
            📭
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-100">
            No tickets yet
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            No tickets yet - submit one from the home page.
          </p>

        </div>
      )}

      {/* Tickets Table */}
      {!loading && !error && tickets.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">

          <table className="w-full min-w-[850px] text-left text-sm">

            <thead className="border-b border-slate-800 bg-slate-800/60 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Subject
                </th>

                <th className="px-6 py-4 font-semibold">
                  Customer
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Category
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Priority
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right font-semibold">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">

              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="transition-colors hover:bg-slate-800/50"
                >

                  {/* Subject */}
                  <td className="px-6 py-5">
                    <p className="font-medium text-slate-100">
                      {ticket.subject}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-5">
                    <p className="font-medium text-slate-200">
                      {ticket.customer_name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {ticket.customer_email}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-5 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        CATEGORY_COLORS[ticket.category]
                      }`}
                    >
                      {ticket.category}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-5 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        PRIORITY_COLORS[ticket.priority]
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        STATUS_COLORS[ticket.status]
                      }`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="whitespace-nowrap px-6 py-5 text-right text-slate-400">
                    {new Date(ticket.created_at).toLocaleDateString()}
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
