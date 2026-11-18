
import type { Ticket, TicketStatus } from "../types";
import TicketCard from "./TicketCard";

type Props = {
  title: string;
  status: TicketStatus;
  tickets: Ticket[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TicketStatus) => void;
};

function TicketColumn({
  title,
  status,
  tickets,
  onDelete,
  onStatusChange,
}: Props) {
  const columnTickets = tickets.filter(
    (ticket) => ticket.status === status
  );

  return (
    <div className="bg-gray-100 rounded-xl p-4 min-h-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800">{title}</h2>

        <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {columnTickets.length}
        </span>
      </div>

      <div className="space-y-4">
        {columnTickets.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No tickets here
          </p>
        ) : (
          columnTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TicketColumn;
