
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../context/TicketContext";
import type { TicketPriority } from "../types";

function NewTicket() {
  const navigate = useNavigate();
  const { addTicket } = useTickets();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("medium");

  const [errors, setErrors] = useState({
    subject: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      subject: subject.trim() ? "" : "Subject is required",
      description: description.trim()
        ? ""
        : "Description is required",
    };

    setErrors(newErrors);

    if (newErrors.subject || newErrors.description) {
      return;
    }

    addTicket({
      id: crypto.randomUUID(),
      subject: subject.trim(),
      description: description.trim(),
      priority,
      status: "open",
      createdAt: new Date().toISOString(),
    });

    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Create New Ticket
      </h1>

      <p className="text-gray-500 mb-8">
        Fill in the details to create a support ticket.
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border space-y-5">

        <div>
          <label className="block font-medium mb-2">
            Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setErrors({ ...errors, subject: "" });
            }}
            placeholder="Enter ticket subject"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: "" });
            }}
            placeholder="Describe the issue..."
            rows={5}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-2">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as TicketPriority)
            }
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
          >
            Create Ticket
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTicket;
