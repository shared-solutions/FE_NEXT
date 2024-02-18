// 마이 페이지
export const getMyPage = async () => {
  try {
    const atkToken = localStorage.getItem("token");
    const url = "https://dev.gomin-chingu.site/user/my-page"; // API 엔드포인트 URL로 교체
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        atk: atkToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("MyPage data:", data);
      return data.result;
    } else {
      console.error("Failed to get MyPage data:", response);
    }
  } catch (error) {
    console.error("Error", error);
  }
};

// 나의프로필(Q&A 질문)
export const getMyQuestion = async () => {
  try {
    const atkToken = localStorage.getItem("token");
    const page = 0;

    const url = new URL(
      "https://dev.gomin-chingu.site/user/my-page/profile/question"
    );
    url.searchParams.append("page", page);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        atk: atkToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Get Question Data:", data);
      return data.result;
    } else {
      console.error("Failed to get Question data:", response);
    }
  } catch (error) {
    console.error("Error", error);
  }
};

// 나의프로필(Q&A 답변)
export const getMyAnswer = async () => {
  try {
    const atkToken = localStorage.getItem("token");
    const page = 0;

    const url = new URL(
      "https://dev.gomin-chingu.site/user/my-page/profile/answer"
    );
    url.searchParams.append("page", page);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        atk: atkToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Get Answer Data:", data.result.commentList);
      return data.result.commentList;
    } else {
      console.error("Failed to get Answer data:", response);
    }
  } catch (error) {
    console.error("Error", error);
  }
};
