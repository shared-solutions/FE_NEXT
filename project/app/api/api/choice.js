import api from "./index";

// 댓글 채택 api
export const choiceComment = async () => {
  console.log("댓글 채택");

  try {
    const response = await api.post(
      "/posts/{post-id}/comment/{comment-id}/choice"
    );
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
