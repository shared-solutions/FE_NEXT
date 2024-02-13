const atkToken = localStorage.getItem("token");

// 회원정보 가져오기
export const getMyInfo = async () => {
  try {
    const url = new URL(
      "https://dev.gomin-chingu.site/user/my-page/profile/modify"
    );

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

// 회원정보 수정(이름변경)


// 회원정보 수정(메일변경)


// 회원정보 수정(번호변경)


// 회원정보 수정(사용자 프로필 사진)
export const modifyProfileImage = async (file) => {
  try {
    const url = "https://dev.gomin-chingu.site/user/my-page/profile/modify/image";

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        //"Content-Type": "multipart/form-data",
        atk: atkToken,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Profile image modified successfully:", data);
      alert("이미지를 성공적으로 수정했습니다!")
      window.location.reload();
    } else {
      console.error("Failed to modify profile image:", response);
    }
  } catch (error) {
    console.error("Error modifying profile image:", error);
  }
};