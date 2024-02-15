import axios from "axios";

// 토큰 받아오기
const accessToken = localStorage.getItem("token");

const api = axios.create({
    baseURL: "http://dev.gomin-chingu.site",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        atk: accessToken,
    },
});

export default api;