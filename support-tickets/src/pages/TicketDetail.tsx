
import PageHeader from "../components/ui/PageHeader";
import { useParams } from "react-router";

function TicketDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <PageHeader
        title="Ticket Details"
        subtitle="View and manage individual support tickets."
      />

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

        <p className="text-sm text-gray-500">
          Ticket ID
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          {id}
        </h2>

        <p className="mt-5 text-gray-500">
          AI reasoning, customer comments, and ticket status
          will be displayed here.
        </p>

      </div>

    </div>
  );
}

export default TicketDetail;
