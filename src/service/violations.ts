import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const ViolationService = {
  // 🔹 Fetch all traffic violations
  async getAllViolations() {
    const response = await axios.get(`${API_URL}/Violation/allviolations`);
    return response.data;
  },

  // 🔹 Get a violation by ID
  async getViolationById(violationId: number) {
    const response = await axios.post(`${API_URL}/Violation/violationById`, {
      id: violationId,
    });
    return response.data;
  },

  // 🔹 Update a violation
  async updateViolation(
    violationId: number,
    updatedData: Partial<{ type: string; location: string; flagged: boolean }>
  ) {
    const response = await axios.put(
      `${API_URL}/Violation/${violationId}`,
      updatedData
    );
    return response.data;
  },

  // 🔹 Delete a violation
  async deleteViolation(violationId: number) {
    const response = await axios.delete(`${API_URL}/Violation/${violationId}`);
    return response.data;
  },
};
