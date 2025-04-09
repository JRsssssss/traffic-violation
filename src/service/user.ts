import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper function to get token from localStorage
const getAuthHeader = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const UserService = {
  async getAllUsers() {
    const response = await axios.get(`${API_URL}/User/allusers`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  async getUserById(userId: number) {
    const response = await axios.post(
      `${API_URL}/User/userById`,
      { id: userId },
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  async createUser(userData: {
    name: string;
    username: string;
    password: string;
    role: string;
  }) {
    const response = await axios.post(`${API_URL}/User/createUser`, userData, {
      headers: getAuthHeader(),
    });
    console.log(response);
    return response.data;
  },

  async updateUser(
    updatedData: Partial<{
      id: number;
      name: string;
      username: string;
      password: string;
      role: string;
    }>
  ) {
    const response = await axios.put(
      `${API_URL}/User/updateUserById`,
      updatedData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  async deleteUser(userId: number) {
    const response = await axios.delete(`${API_URL}/User/deleteUser`, {
      headers: getAuthHeader(),
      data: { userId },
    });
    return response.data;
  },

  async login(credentials: { username: string; password: string }) {
    // Login doesn't need authorization header
    const response = await axios.post(`${API_URL}/User/login`, credentials);
    return response.data;
  },
};
