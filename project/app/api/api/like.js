import api from "./index";

// 경로 하드코딩 되어있어서 추후에 변경
// 좋아요 등록(연동 성공)
export const postLike = async () => {
  console.log("좋아요 누름");
  try {
    const atkToken = localStorage.getItem("accesstoken");

    const response = await api.post("/posts/3/like", null, {
      headers: {
        atk: `${atkToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("에러남", error);
    throw error;
  }
};

// 좋아요 취소(서버문제)
export const deleteLike = async () => {
  console.log("좋아요 취소");
  try {
    const atkToken = localStorage.getItem("accesstoken");
    const response = await api.delete("/posts/3/like/del", {
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

// 댓글 좋아요 api
export const likeComment = async (commentid, postId) => {
  console.log("댓글 좋아요");
  try {
    const atkToken = localStorage.getItem("token");
    const response = await api.post(
      `/posts/${postId}/comment/${commentid}/like`,
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
// 댓글 좋아요 취소
export const deleteCommentLike = async (commentid, postId) => {
  console.log("댓글 좋아요 취소");
  try {
    const atkToken = localStorage.getItem("token");
    const response = await api.delete(
      `/posts/${postId}/comment/${commentid}/like/del`,
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
