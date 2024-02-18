// 저장한 게시물(내 카테고리)
export const getMyCategory = async (categories) => {
  try {
    const atkToken = localStorage.getItem("token");
    const promises = categories.map(async (category) => {
      const url = new URL(
        `https://dev.gomin-chingu.site/posts/poll-post/${category}`
      );
      url.searchParams.append("page", "0");
      url.searchParams.append("size", "3");
      url.searchParams.append("category", category);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Post with Categories:", data);
        return data.result.pollPostList;
      } else {
        console.error("Failed to get MyPage data:", response);
      }
    });
    await Promise.all(promises);
  } catch (error) {
    console.error("Error", error);
  }
};

// 저장한 게시물(모든게시물)
export const getMyPost = async (sort) => {
  try {
    const atkToken = localStorage.getItem("token");
    const page = 0;

    const url = new URL("https://dev.gomin-chingu.site/user/my-page/post/all"); // API 엔드포인트 URL로 교체
    url.searchParams.append("page", page);
    url.searchParams.append("sort", sort);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        atk: atkToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Post data:", data);
      return data.result.postList;
    } else {
      console.error("Failed to get MyPage data:", response);
    }
  } catch (error) {
    console.error("Error", error);
  }
};
