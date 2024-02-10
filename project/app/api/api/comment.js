import api from "./index";

// 댓글 생성 api
export const postComment = async (content, Long) => {
  const requestBody = {
    content: content,
    Long: Long,
  };
  console.log("댓글 api 연동");

  try {
    // 추후에 경로 수정해야됨 하드코딩되어있음
    const atkToken = localStorage.getItem("accesstoken");
    const response = await api.post("/posts/3/comment", requestBody, {
      headers: {
        atk: `${atkToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};

// 댓글 전체조회 api
export const lookupComment = async () => {
  //   아마 전체 조회라 리퀘스트 바디 안필요할거같긴함

  console.log("댓글 전체조회");

  try {
    const response = await api.get("/posts/3/comments");
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
// 댓글 수정 api
export const modifyComment = async (content) => {
  const requestBody = {
    content: content,
  };
  console.log("댓글 수정");

  try {
    const response = await api.patch(
      "/posts/{post-id}/comment/{comment-id}/edit",
      requestBody
    );
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};

// 댓글 삭제 api
export const deleteComment = async () => {
  console.log("댓글 삭제");
  try {
    const response = await api.patch(
      "/posts/{post-id}/comment/{comment-id}/del"
    );
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
