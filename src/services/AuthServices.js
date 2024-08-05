import axios from "axios";

// const API_URL = 'https://localhost:7282/api/Auth/login'; 


export const login = async (email, password) => {
    try {
      const response = await axios.post(`https://localhost:7282/api/Auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };