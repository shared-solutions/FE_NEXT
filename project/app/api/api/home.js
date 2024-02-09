import api from "./index";

// 지금 가장 핫한 고민투표 조회 api
export const getBest = async () => {
  // 쿼리파라미터로 GET /posts/best?page=0&size=3 이런식으로 사용자가 아래로 스크롤 할 수록 page 값을 +1 해서 진행
  console.log("핫한 고민 투표 조회");
  try {
    const response = await api.get("/posts/best");
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};

// 답변을 기다리는 고민들 조회 api
export const getRecent = async () => {
  // 쿼리파라미터로 GET /posts/recent?page=0&size=3 이런식으로 사용자가 아래로 스크롤 할 수록 page 값을 +1 해서 진행
  console.log("답변 기다리는 고민 조회");
  try {
    const response = await api.get("/posts/recent");
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
