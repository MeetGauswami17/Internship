
import type {
  TicketCategory,
  TicketPriority,
} from "../types/database";

export type TriageResult = {
  category: TicketCategory;
  priority: TicketPriority;
  reasoning: string;
};

export const TICKET_CATEGORY = {
  OTHER: "other" as TicketCategory,
};

export const TICKET_PRIORITY = {
  MEDIUM: "medium" as TicketPriority,
};

export const TICKET_STATUS = {
  OPEN: "open" as const,
};

export async function triageTicket(
  subject: string,
  _description: string
): Promise<TriageResult> {
  console.log("AI triage will run for:", subject);

  return {
    category: TICKET_CATEGORY.OTHER,
    priority: TICKET_PRIORITY.MEDIUM,
    reasoning: "AI triage pending - placeholder decision.",
  };
}
