import api from "./index";

// 신고하기 api
export const postReport = async (content, target_type, target_id, category) => {
  // target_type(신고 콘텐츠 타입) 1 : 게시물 / 2 : 댓글
  // target_id(신고 콘텐츠 아이디)
  // category (카테고리) 0 : 스팸 / 1 : 음란물 / 2 : 성격에 맞지 않는 글 / 3 : 과도한 욕설 / 4 : 광고 등등..
  const requestBody = {
    content: content,
    target_type: target_type,
    target_id: target_id,
    category: category,
  };

  console.log("신고하기");
  try {
    const response = await api.post("/report", requestBody);
    return response.data;
  } catch (error) {
    console.log("에러", error);
    throw error;
  }
};
