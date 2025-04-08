import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const ReportService = {
    async createReport(reportData: { content: string; status: string; violationId: number; officerId: number; includePlate: boolean; includeViolationType: boolean; }) {
        const response = await axios.post(`${API_URL}/Report/createReport`, reportData);
        console.log(response)
        return response.data;
    },

    async getReportByOfficerId(officerId: number) {
        const response = await axios.post(`${API_URL}/Report/getReportByOfficerId`, {
          id: officerId,
        });
        return response.data;
    },

    async getAllReports() {
        const response = await axios.get(`${API_URL}/Report/getAllReports`);
        return response.data;
    },

    async getReportById(id: number) {
        const response = await axios.post(`${API_URL}/Report/getReportById`, {
          id: id,
        });
        return response.data;
    },

    async updateReportById(id: number, status: string) {
        const response = await axios.put(`${API_URL}/Report/updateReportById`, {
          id: id,
          status: status,
        });
        return response.data;
    },
}