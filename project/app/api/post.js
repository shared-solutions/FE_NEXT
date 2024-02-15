// // import api from "./axios";

// // export const fetchDataFromApi = async (category) => {
// //   try {
// //     const response = await api.get(`/posts/poll-post/${category}`);
// //     return response.data; // 요청 성공 시 데이터 반환
// //   } catch (error) {
// //     console.error("Error: ", error);
// //     return null; // 요청 실패 시 null 반환
// //   }
// // };


// import axios from 'axios';

// const atkToken = localStorage.getItem("token");

// const getMyPage = async () => {
//   try {
//     const url = `http://dev.gomin-chingu.site/posts/poll-post/${category}`;
//     const params = new URLSearchParams();
//     params.append("page", "0");
//     params.append("size", "5");
//     params.append("category", "모두");

//     const response = await axios.get(url, {
//       params: params,
//       headers: {
//         "Content-Type": "application/json",
//         atk: atkToken,
//       },
//     });

//     if (response.status === 200) {
//       const data = response.data;
//       setUserData(data.result);
//       console.log("MyPage data:", data);
//     } else {
//       console.error("Failed to get MyPage data:", response);
//     }
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

// export default getMyPage;
