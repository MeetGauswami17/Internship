
import type { Ticket } from "../types";

type Props = {
  ticket: Ticket;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Ticket["status"]) => void;
};

function TicketCard({ ticket, onDelete, onStatusChange }: Props) {
  const priorityColors = {
    urgent: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-slate-100 text-slate-700",
  };

  const statusColors = {
    open: "bg-blue-100 text-blue-700",
    in_progress: "bg-purple-100 text-purple-700",
    resolved: "bg-green-100 text-green-700",
  };

  const nextStatus = {
    open: "in_progress",
    in_progress: "resolved",
    resolved: "open",
  } as const;

  const formatStatus = (status: Ticket["status"]) =>
    status.replace("_", " ");

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-gray-800">
          {ticket.subject}
        </h3>

        <button
          onClick={() => onDelete(ticket.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-gray-600">
        {ticket.description}
      </p>

      <p className="text-xs text-gray-400">
        {new Date(ticket.createdAt).toLocaleDateString()}
      </p>

      <div className="flex flex-wrap gap-2">
        <span className={`px-3 py-1 rounded-full text-xs capitalize ${priorityColors[ticket.priority]}`}>
          {ticket.priority}
        </span>

        <span className={`px-3 py-1 rounded-full text-xs capitalize ${statusColors[ticket.status]}`}>
          {formatStatus(ticket.status)}
        </span>
      </div>

      <button
        onClick={() => onStatusChange(ticket.id, nextStatus[ticket.status])}
        className="w-full bg-indigo-50 text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100"
      >
        Move to {formatStatus(nextStatus[ticket.status])}
      </button>
    </div>
  );
}

export default TicketCard;
