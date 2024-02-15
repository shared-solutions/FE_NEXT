import api from "./index";

// 댓글 채택 api
export const choiceComment = async (commentid) => {
  console.log("댓글 채택");

  try {
    const atkToken = localStorage.getItem("accesstoken");
    const response = await api.post(
      `/posts/3/comment/${commentid}/choice`,
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
