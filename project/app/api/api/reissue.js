import axios from 'axios';

// 쿠키의 만료 시간을 확인하는 함수
function checkTokenExpiration() {
    const token = getCookie('token'); // 쿠키에서 토큰을 가져온다는 가정하에 작성됨
    if (!token) {
        return false; // 토큰이 없으면 만료 시간을 확인할 필요가 없음
    }
    const decodedToken = decodeToken(token); // 토큰을 디코딩하여 만료 시간을 가져온다는 가정하에 작성됨
    const expirationTime = decodedToken.exp * 1000; // 토큰의 만료 시간 (밀리초 단위로 변환)
    const currentTime = Date.now(); // 현재 시간 (밀리초)
    const timeLeft = expirationTime - currentTime; // 토큰의 만료까지 남은 시간 (밀리초)
    return timeLeft <= 30000; // 토큰의 만료까지 남은 시간이 30초 이하면 true, 그렇지 않으면 false 반환
}

// 토큰을 재발급하는 함수
async function reissueToken() {
    try {
        const response = await axios.post('/reissue-token'); // 재발급 요청을 보냄
        const newToken = response.data.token; // 새로운 토큰을 받아옴
        setCookie('token', newToken); // 새로운 토큰을 쿠키에 저장한다는 가정하에 작성됨
        return newToken; // 새로운 토큰 반환
    } catch (error) {
        console.error('Error reissuing token:', error);
        return null;
    }
}

// 쿠키의 만료 시간이 30초 이하로 남았을 때 토큰을 재발급하는 함수
async function checkAndReissueToken() {
    if (checkTokenExpiration()) {
        const newToken = await reissueToken(); // 토큰 재발급
        if (newToken) {
            console.log('Token successfully reissued:', newToken);
        } else {
            console.log('Failed to reissue token.');
        }
    }
}

// 주기적으로 쿠키의 만료 시간을 확인하여 토큰을 재발급하는 로직
setInterval(checkAndReissueToken, 10000);