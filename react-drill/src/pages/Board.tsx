
import { useState } from "react";
import TicketColumn from "../components/TicketColumn";
import { useTickets } from "../context/TicketContext";

function Board() {
  const { tickets, deleteTicket, updateStatus } = useTickets();

  const [search, setSearch] = useState("");

  const filteredTickets = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Ticket Board
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all your support tickets in one place.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TicketColumn
          title="Open"
          status="open"
          tickets={filteredTickets}
          onDelete={deleteTicket}
          onStatusChange={updateStatus}
        />

        <TicketColumn
          title="In Progress"
          status="in_progress"
          tickets={filteredTickets}
          onDelete={deleteTicket}
          onStatusChange={updateStatus}
        />

        <TicketColumn
          title="Resolved"
          status="resolved"
          tickets={filteredTickets}
          onDelete={deleteTicket}
          onStatusChange={updateStatus}
        />
      </div>

      {search && filteredTickets.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No matching tickets found.
        </p>
      )}
    </div>
  );
}

export default Board;
