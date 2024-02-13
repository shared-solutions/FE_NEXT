import axios from "axios";

// 이메일 로그인
export const handleLogin = async () => {
  try {
    const endpoint = "https://dev.gomin-chingu.site/user/login";
    const requestBody = {
      email: process.env.NEXT_PUBLIC_USER_EMAIL,
      password: process.env.NEXT_PUBLIC_USER_PASSWORD,
    };
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.result[0].token) {
      localStorage.setItem("token", response.data.result[0].token);
      console.log();
      //alert("성공적으로 로그인했습니다!");
    }
    console.log(response.data.result);
  } catch (error) {
    console.log(error);
    //alert("ID 또는 비밀번호가 틀립니다.");
  }
};

// 이메일 인증 코드 발송
export const mailSend = async (changeEmail) => {
  try {
    const endpoint = "https://dev.gomin-chingu.site/user/mailSend";
    const requestBody = {
      email: changeEmail,
    };
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.isSuccess === true) {
      alert("인증 코드를 전송했습니다.");
    }
    console.log(response.data.result);
  } catch (error) {
    console.log(error);
    alert("잘못된 입력입니다.");
  }
};