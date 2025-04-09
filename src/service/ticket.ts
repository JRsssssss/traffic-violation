import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper function to get token from localStorage
const getAuthHeader = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const TicketService = {
  async getAllTickets() {
    const response = await axios.get(`${API_URL}/Ticket/alltickets`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  async getTicketById(ticketId: number) {
    const response = await axios.post(
      `${API_URL}/Ticket/ticketById`,
      {
        id: ticketId,
      },
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  async createTicket(ticketData: any) {
    const response = await axios.post(
      `${API_URL}/Ticket/createTicket`,
      ticketData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  async updateTicket(updatedData: any) {
    const response = await axios.put(
      `${API_URL}/Ticket/updateTicketById`,
      updatedData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  async deleteTicket(ticketId: number) {
    const response = await axios.delete(`${API_URL}/Ticket/deleteTicket`, {
      headers: getAuthHeader(),
      data: { id: ticketId },
    });
    return response.data;
  },

  // generate ticket
  async generateTicket(violationId: number) {
    const response = await axios.get(
      `${API_URL}/Violation/getTicketFromViolation`,
      {
        headers: getAuthHeader(),
        params: { violationId },
        responseType: "blob",
      }
    );
    return response.data;
  },
};
