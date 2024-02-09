import axios from 'axios';

const baseURL = 'https://www.demo609.amrithaa.com/backend-cema/public/api';

const api = {
  async passwordChangeDone() {
    try {
      const response = await axios.get(`${baseURL}/password-change-done`);

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
