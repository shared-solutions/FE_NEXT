import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
const accessToken = localStorage.getItem("accessToken");
axios.defaults.headers.common["Authorization"] = `${accessToken}`;
const api = axios.create({
  baseURL: "http://dev.gomin-chingu.site",
  timeout: 10000,
});

export default api;
