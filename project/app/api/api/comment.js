import api from "./index";

// 댓글 생성 api
export const postComment = async (content, parentId, postId) => {
  const requestBody = {
    content: content,
    parentId: parentId || null,
  };
  console.log("댓글 api 연동");

  try {
    // 추후에 경로 수정해야됨 하드코딩되어있음
    const atkToken = localStorage.getItem("token");
    const response = await api.post(`/posts/${postId}/comment`, requestBody, {
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

// 댓글 전체조회 api(완료)
export const lookupComment = async ({ postId }) => {
  console.log("댓글 전체조회");

  try {
    const atkToken = localStorage.getItem("token");
    const response = await api.get(`/posts/${postId}/comments`, {
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
// 댓글 수정 api(안하기로함)
// export const modifyComment = async (content) => {
//   const requestBody = {
//     content: content,
//   };
//   console.log("댓글 수정");

//   try {
//     const response = await api.patch(
//       "/posts/{post-id}/comment/{comment-id}/edit",
//       requestBody
//     );
//     return response.data;
//   } catch (error) {
//     console.log("에러", error);
//     throw error;
//   }
// };

// 댓글 삭제 api
export const deleteComment = async (commentid, postId) => {
  console.log("댓글 삭제");
  try {
    const atkToken = localStorage.getItem("token");
    const response = await api.patch(
      `/posts/${postId}/comment/${commentid}/del`,
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
