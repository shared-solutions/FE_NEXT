import api from "./index";

// 댓글 채택 api
export const choiceComment = async (commentid, postId) => {
  console.log("댓글 채택");

  try {
    const atkToken = localStorage.getItem("token");
    const response = await api.post(
      `/posts/${postId}/comment/${commentid}/choice`,
      null,
      {
        headers: {
          atk: `${atkToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
