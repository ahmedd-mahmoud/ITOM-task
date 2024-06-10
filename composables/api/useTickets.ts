import type { TicketResponse } from "~/types/api";
import { useMessage } from "naive-ui";
import usePocketBase from "~/composables/server/usePocketbase";
import { TicketStatusOptions, TicketPriorityOptions } from "~/types/enums";

export default function () {
  const client = usePocketBase();
  const message = useMessage();

  const tickets = useState<TicketResponse[]>("tickets", () => []);

  // Create a new ticket
  const createTicket = async (
    title: string,
    priority: TicketPriorityOptions,
    assignedTechnician?: string
  ) => {
    try {
      await client.collection("tickets").create({
        title,
        priority,
        activityStatus: TicketStatusOptions.UNREAD,
        assignedTechnician: assignedTechnician || "",
      });

      message.success("Ticket created successfully");
    } catch (error) {
      message.error("Failed to create ticket");
    }
  };

  // Fetch all tickets
  const fetchTickets = async () => {
    try {
      const res = await client
        .collection("tickets")
        .getFullList<TicketResponse>(50);
      tickets.value = res;
    } catch (error) {
      console.error("Failed to get tickets");
    }
  };

  // Update a ticket
  const updateTicket = async (ticketId: string, data: Object) => {
    try {
      await client.collection("tickets").update<TicketResponse>(ticketId, data);

      message.success("Ticket updated successfully");
    } catch (error) {
      message.error("Failed to update ticket");
    }
  };

  return {
    tickets,
    createTicket,
    fetchTickets,
    updateTicket,
  };
}
