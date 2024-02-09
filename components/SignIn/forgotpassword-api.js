import axios from 'axios';

const baseURL = 'https://www.demo609.amrithaa.com/backend-cema/public/api';

const api = {
  async sendForgotPasswordEmail(email) {
    try {
      const response = await axios.post(`${baseURL}/forgot-password`, {
        email,
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
