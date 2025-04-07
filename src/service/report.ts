import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const ReportService = {
    async createReport(reportData: { content: string; status: string; violationId: number; officerId: number; includePlate: boolean; includeViolationType: boolean; }) {
        const response = await axios.post(`${API_URL}/Report/createReport`, reportData);
        console.log(response)
        return response.data;
    },

    async getReportById(officerId: number) {
        const response = await axios.post(`${API_URL}/Report/getReportById`, {
          id: officerId,
        });
        return response.data;
      },
}