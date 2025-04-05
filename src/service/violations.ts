import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/Violation";

export const ViolationService = {
  async getAllViolations() {
    const response = await axios.get(`${API_URL}/allviolations`);
    return response.data;
  },

  async getViolationById(violationId: number) {
    const response = await axios.post(`${API_URL}/violationById`,{id: violationId});
    return response.data;
  },

  async updateViolation(updatedData: Partial<{id: number, date: Date, plate: string, type: string; location: string; }>) {
    const response = await axios.put(`${API_URL}/updateViolationById`, updatedData);
    return response.data;
  },

  async deleteViolation(violationId: number) {
    const response = await axios.delete(`${API_URL}/deleteViolation`, {data: violationId});
    return response.data;
  }
};
