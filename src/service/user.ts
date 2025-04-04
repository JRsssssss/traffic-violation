import axios from "axios";

const API_URL = "http://localhost:5000/User";

export const UserService = {
  // 🔹 Fetch all users
  async getAllUsers() {
    const response = await axios.get(`${API_URL}/allusers`);
    return response.data;
  },

  // 🔹 Get user by ID
  async getUserById(userId: number) {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  },

  // 🔹 Create a new user
  async createUser(userData: { name: string; username: string; password: string; role: string }) {
    const response = await axios.post(`${API_URL}/createUser`, userData);
    console.log(response)
    return response.data;
  },

  // 🔹 Update user details
  async updateUser(userId: number, updatedData: Partial<{ name: string; username: string; role: string }>) {
    const response = await axios.put(`${API_URL}/${userId}`, updatedData);
    return response.data;
  },

  // 🔹 Delete a user
  async deleteUser(userId: number) {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  },

  // 🔹 User login
  async login(credentials: { username: string; password: string }) {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  }
};
