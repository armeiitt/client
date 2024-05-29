import environment from "../environtment/environment";

const API_URL = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/products`;

const apiService = {
  async getData(endpoint) {
    try {
      const api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/${endpoint}`;
      let rest_api = { method: "GET" };
      const res = await fetch(api_url, rest_api);
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  },

  async getDecorbyCategory(endpoint, type) {
    try {
      const api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/${endpoint}`;
      let rest_api = { method: "GET" };
      const res = await fetch(api_url, rest_api);
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  },

  // async postData(endpoint, data) {
  //   try {
  //     const response = await axios.post(`${API_URL}/${endpoint}`, data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //     throw error;
  //   }
  // },

  getProdPhotoURL(nameImg) {
    return `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/prod_photo/${nameImg}`;
  },

  getDecorPhotoURL(nameImg) {
    return `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/decor_photo/${nameImg}`;
  },
};

export default apiService;
