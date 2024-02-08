import api from "./index";

// 경로 하드코딩 되어있어서 추후에 변경
// 좋아요 등록
export const postLike = async () => {
  console.log("좋아요 누름");
  try {
    const response = await api.post("/posts/{post-id}/like");
    return response.data;
  } catch (error) {
    console.log("에러남", error);
    throw error;
  }
};

// 좋아요 취소
export const deleteLike = async () => {
  console.log("좋아요 취소");
  try {
    const response = await api.delete("/posts/{post-id}/like/del");
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};

// 댓글 좋아요 api
export const likeComment = async () => {
  console.log("댓글 좋아요");
  try {
    const response = await api.post(
      "/posts/{post-id}/comment/{comment-id}/like"
    );
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};

export const deleteCommentLike = async () => {
  console.log("댓글 좋아요 취소");
  try {
    const response = await api.delete(
      "/posts/{post-id}/comment/{comment-id}/like/del"
    );
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
