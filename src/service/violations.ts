import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper function to get token from localStorage
const getAuthHeader = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const ViolationService = {
  async getAllViolations() {
    const response = await axios.get(`${API_URL}/Violation/allviolations`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  async getViolationById(violationId: number) {
    const response = await axios.post(
      `${API_URL}/Violation/violationById`,
      {
        id: violationId,
      },
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  async updateViolation(
    updatedData: Partial<{
      id: number;
      date: Date;
      plate: string;
      type: string;
      location: string;
    }>
  ) {
    const response = await axios.put(
      `${API_URL}/Violation/updateViolationById`,
      updatedData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  async deleteViolation(violationId: number) {
    const response = await axios.delete(
      `${API_URL}/Violation/deleteViolation`,
      {
        headers: getAuthHeader(),
        data: { id: violationId },
      }
    );
    return response.data;
  },
};
