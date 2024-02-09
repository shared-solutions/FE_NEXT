import axios from "axios";

const api = axios.create({
  baseURL: "https://dev.gomin-chingu.site",
  timeout: 50000,
});

export default api;
