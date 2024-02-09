import axios from 'axios';

const baseURL = 'https://www.demo609.amrithaa.com/backend-cema/public/api';

const api = {
  async signup(user) {
    const response = await axios.post(`${baseURL}/signup`, {
      user,
    });

    return response.data;
  },
};

export default api;
