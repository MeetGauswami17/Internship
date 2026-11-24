
import type {
  TicketCategory,
  TicketPriority,
} from "../types/database";

export type TriageResult = {
  category: TicketCategory;
  priority: TicketPriority;
  reasoning: string;
};

// Placeholder constants until real AI triage is added.
export const TICKET_CATEGORY = {
  OTHER: "other" as TicketCategory,
};

export const TICKET_PRIORITY = {
  MEDIUM: "medium" as TicketPriority,
};

// Week 8: Replace this function's body with a Supabase
// Edge Function call to Gemini. Keep the same signature.
export async function triageTicket(
  subject: string,
  description: string
): Promise<TriageResult> {
  console.log("AI triage will run for:", subject);

  return {
    category: TICKET_CATEGORY.OTHER,
    priority: TICKET_PRIORITY.MEDIUM,
    reasoning: "AI triage pending - placeholder decision.",
  };
}
