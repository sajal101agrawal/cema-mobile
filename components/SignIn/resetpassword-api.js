import axios from 'axios';

const baseURL = 'https://www.demo609.amrithaa.com/backend-cema/public/api';

const api = {
  async resetPassword(token, newPassword) {
    try {
      const response = await axios.post(`${baseURL}/reset-password`, {
        token,
        newPassword,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle 400 or 500 error
      } else {
        // Handle network error
      }
    }
  },
};

export default api;
