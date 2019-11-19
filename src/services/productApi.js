const axios = require("axios");
const PROXY_URL = "https://cors-anywhere.herokuapp.com";
const API_URL = "https://www.mec.ca/api/v1/products";

export const searchProducts = keyword => {
  return axios(`${PROXY_URL}/${API_URL}/search?keywords=${keyword}`);
};
