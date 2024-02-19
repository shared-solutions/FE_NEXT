
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Modal() {
    const router = useRouter();
    
    useEffect(() => {
        const handleKakaoLogin = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                console.log(code); // 코드가 잘 가져와지는지 확인하기 위해 콘솔에 출력
    
                if (code) {
                    const response = await axios.get(`http://dev.gomin-chingu.site/user/login/kakao?code=${code}`);
                    console.log('Kakao OAuth response:', response.data);
                    // 여기서 서버로부터 받은 토큰을 이용하여 로그인 등의 추가 작업을 수행할 수 있음
                    const token = response.data.token;
                    window.localStorage.setItem('token', token);
                    router.push('/home');
                }
            } catch (error) {
                console.error('Kakao OAuth error:', error);
            }
        };
    
        handleKakaoLogin();
    }, [router]);
    return(
        <div>
            loading...
        </div>
    );
}