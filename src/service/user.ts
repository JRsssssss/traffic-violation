import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const UserService = {
  async getAllUsers() {
    const response = await axios.get(`${API_URL}/User/allusers`);
    return response.data;
  },

  async getUserById(userId: number) {
    const response = await axios.get(`${API_URL}/User/${userId}`);
    return response.data;
  },

  // 🔹 Create a new user
  async createUser(userData: {
    name: string;
    username: string;
    password: string;
    role: string;
  }) {
    const response = await axios.post(`${API_URL}/User/createUser`, userData);
    console.log(response);
    return response.data;
  },

  // 🔹 Update user details
  async updateUser(
    userId: number,
    updatedData: Partial<{id: number; name: string; username: string; password: string; role: string }>
  ) {
    const response = await axios.put(`${API_URL}/User/${userId}`, updatedData);
    return response.data;
  },

  async deleteUser(userId: number) {
    const response = await axios.delete(`${API_URL}/User/${userId}`);
    return response.data;
  },
  
  async login(credentials: { username: string; password: string }) {
    const response = await axios.post(`${API_URL}/User/login`, credentials);
    return response.data;
  },
};
