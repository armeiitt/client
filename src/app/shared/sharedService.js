import environment from "../environtment/environment";

const API_URL = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/products`;

const apiService = {
  //   async getData(endpoint) {
  //     try {
  //         let api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/${endpoint}`;
  //         let rest_api = { method: "GET" };
  //         const res = await fetch(api_url, rest_api);
  //         const dataImg = await res.json();
  //         for (let item of dataImg.data) {
  //           item.src = getProdPhotoURL(item.image);
  //         }
  //         setData(dataImg.data);
  //         setLoading(false);
  //         console.log(1121312);
  //       } catch (error) {
  //         setLoading(false);
  //         setError(error.message);
  //       }
  //   },

  async postData(endpoint, data) {
    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  async getProdPhotoURL(nameImg) {
    return `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/prod_photo/${nameImg}`;
  },

  async postData(endpoint, data) {
    try {
      const response = await (`${API_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },
};

export default apiService;
