'use client'
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
  // 쿠키를 가져오는 함수
  let rtk = localStorage.getItem('rtk')
  let token = localStorage.getItem('token')
  console.log("dd")
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  // 토큰을 디코딩하는 함수
  function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  // 토큰을 재발급하는 함수
  async function reissueToken() {
    try {
      const requestData = {
        atk: token
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'rtk' : rtk
        }
      };
      const response = await axios.post('http://dev.gomin-chingu.site/user/reissue', requestData,config);
      const newToken = response.data[0].token;
      // 토큰을 저장하는 로직은 여기에 구현되어야 합니다.
      console.log('New token:', newToken);
      return newToken;
    } catch (error) {
      console.error('Error reissuing token:', error);
      return null;
    }
  }

  // 쿠키의 만료 시간이 30초 이하로 남았을 때 토큰을 재발급하는 함수
  async function checkAndReissueToken() {
    if (checkTokenExpiration()) {
      const newToken = await reissueToken();
      if (newToken) {
        console.log('Token successfully reissued:', newToken);
      } else {
        console.log('Failed to reissue token.');
      }
    }
  }

  // 쿠키의 만료 시간을 확인하는 함수
  function checkTokenExpiration() {
    const token = getCookie('token');
    if (!token) {
      return false;
    }
    
    const decodedToken = decodeToken(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    const timeLeft = expirationTime - currentTime;
    console.log(timeLeft)
    return timeLeft <= 30000;
  }

  useEffect(() => {
    checkAndReissueToken();

    // 주기적으로 쿠키의 만료 시간을 확인하여 토큰을 재발급하는 로직
    const intervalId = setInterval(checkAndReissueToken, 10000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => clearInterval(intervalId);
  }, []);

    return (
      <div>
        <button onClick={reissueToken}>eee</button>
      </div>
    )
  }
