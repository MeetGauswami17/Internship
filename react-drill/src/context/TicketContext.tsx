
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import type { Ticket, TicketStatus } from "../types";
import { seedTickets } from "../data/seedTickets";
import useLocalStorage from "../hooks/useLocalStorage";

type TicketContextType = {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
  updateStatus: (id: string, status: TicketStatus) => void;
};

const TicketContext = createContext<TicketContextType | undefined>(
  undefined
);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useLocalStorage<Ticket[]>(
    "desk-tickets",
    seedTickets
  );

  const addTicket = (ticket: Ticket) => {
    setTickets([...tickets, ticket]);
  };

  const deleteTicket = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const updateStatus = (id: string, status: TicketStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  };

  return (
    <TicketContext.Provider
      value={{ tickets, addTicket, deleteTicket, updateStatus }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("useTickets must be used inside TicketProvider");
  }

  return context;
}
