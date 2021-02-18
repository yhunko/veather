import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_ENDPOINT,
  params: {
    appid: process.env.VUE_APP_API_KEY
  }
});

export default instance;
