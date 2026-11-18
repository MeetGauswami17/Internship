
import type { Ticket } from "../types";

export const seedTickets: Ticket[] = [
  {
    id: "1",
    subject: "Login issue",
    description: "User cannot log into the application.",
    priority: "high",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    subject: "Payment failure",
    description: "Payment is not processing correctly.",
    priority: "urgent",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    subject: "Update profile",
    description: "User wants to update profile details.",
    priority: "medium",
    status: "in_progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    subject: "Website loading issue",
    description: "Dashboard takes too much time to load.",
    priority: "low",
    status: "resolved",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    subject: "Password reset",
    description: "Password reset email is not received.",
    priority: "high",
    status: "in_progress",
    createdAt: new Date().toISOString(),
  },
];
