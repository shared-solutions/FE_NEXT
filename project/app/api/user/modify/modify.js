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
export const modifyNickName = async (email, authNum, nickName) => {
  try {
    const url = "https://dev.gomin-chingu.site/user/my-page/profile/modify/name";

    const requestBody ={ 
      'email': email,
      'certification': authNum,
      'nickName': nickName,
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "atk": atkToken,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Nickname modified successfully:", data);
      alert("닉네임을 성공적으로 변경했습니다.")
      window.location.reload();
    } else {
      console.error("Failed to modify profile image:", response);
    }
  } catch (error) {
    alert("닉네임을 변경하는 데 실패했습니다.")
    console.error("Error modifying profile image:", error);
  }
};

// 회원정보 수정(메일변경)
export const modifyEmail = async (email, authNum, changeEmail) => {
  try {
    const url = "https://dev.gomin-chingu.site/user/my-page/profile/modify/email";

    const requestBody ={ 
      'curEmail': email,
      'certification': authNum,
      'changeEmail': changeEmail,
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "atk": atkToken,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Email modified successfully:", data);
      alert("이메일을 성공적으로 변경했습니다.")
      window.location.reload();
    } else {
      console.error("Failed to modify email", response);
    }
  } catch (error) {
    alert("이메일을 변경하는 데 실패했습니다.")
    console.error("Error modifying profile image:", error);
  }
};

// 회원정보 수정(번호변경)
export const modifyPhone = async (email, authNum, phone) => {
  try {
    const url = "https://dev.gomin-chingu.site/user/my-page/profile/modify/phone";

    const requestBody ={ 
      'email': email,
      'certification': authNum,
      'phone': phone,
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "atk": atkToken,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Phone number modified successfully:", data);
      alert("휴대폰 번호를 성공적으로 변경했습니다.")
      window.location.reload();
    } else {
      console.error("Failed to modify phone number:", response);
    }
  } catch (error) {
    alert("휴대폰 번호를 변경하는 데 실패했습니다.")
    console.error("Error modifying profile image:", error);
  }
};

// 회원정보 수정(비밀번호 변경)
export const modifyPassword = async (curPassword, changePassword, checkPassword) => {
  try {
    const url = "https://dev.gomin-chingu.site/user/my-page/profile/modify/password";

    const requestBody ={ 
      'curPassword': curPassword,
      'changePassword': changePassword,
      'checkPassword': checkPassword,
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "atk": atkToken,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Phone number modified successfully:", data);
      alert("비밀번호를 성공적으로 변경했습니다.")
    } else {
      console.error("Failed to modify password", response);
    }
  } catch (error) {
    alert("비밀번호를 변경하는 데 실패했습니다.")
    console.error("Error modifying profile image:", error);
  }
};

// 회원정보 수정(보안 메일 변경)
export const modifySecurity = async (email, authNum) => {
  try {
    const url = "https://dev.gomin-chingu.site/user/my-page/profile/modify/security";

    const requestBody ={ 
      'securityEmail': email,
      'certification': authNum,
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "atk": atkToken,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Security Email modified successfully:", data);
      alert("보안 메일을 성공적으로 변경했습니다.")
      window.location.reload();
    } else {
      console.error("Failed to modify email", response);
    }
  } catch (error) {
    alert("이메일을 변경하는 데 실패했습니다.")
    console.error("Error modifying email", error);
  }
};

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
      alert("이미지를 성공적으로 변경했습니다.")
      window.location.reload();
    } else {
      console.error("Failed to modify profile image:", response);
    }
  } catch (error) {
    console.error("Error modifying profile image:", error);
  }
};