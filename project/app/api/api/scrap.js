import api from "./index";

// 스크랩 등록 api
export const postScrap = async () => {
  console.log("스크랩 등록");

  try {
    const response = await api.post("/posts/{post-id}/scrap");
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};

// 스크랩 취소 api
export const deleteScrap = async () => {
  console.log("스크랩 취소");

  try {
    const response = await api.delete("/posts/{post-id}/scrap/del");
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
