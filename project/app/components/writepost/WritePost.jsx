'use client'
import { useState } from 'react';
import axios from 'axios';
import Image from "next/image"
import styles from '@/app/modules/writepostCss/writepost.module.scss'

import WritePostHeader from "./WritePostHeader"
import WritePostFooter from "./WritePostFooter"

const WritePost = () => {
    const [title, setTitle] = useState(''); // 제목 상태 변수
    const [content, setContent] = useState(''); // 내용 상태 변수
    const [file, setFile] = useState(null);

    const authToken = localStorage.getItem("token");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('request', JSON.stringify({
                title: title,
                content: content,
                // ----- 하드코딩 시작 -----
                category: "교육",
                postType: 1,
                postVoteType: 1,
                pollTitle: "투표제목",
                multipleChoice: true,
                parent_id : 0, // 후기글일때는 1
                deadline: "2024-02-15T02:16:56.811Z",
                point: 0
                // ----- 하드코딩 끝 -----
            }));
            formData.append('file', file);

            const response = await axios.post('https://dev.gomin-chingu.site/posts/', formData, {
                headers: {
                    atk : authToken,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log('Post 요청 성공:', response.data);
        } catch (error) {
            console.error('Post 요청 실패:', error);
        }
    };

    return (
        <div>
            <div className={styles.container} style={{ background: 'white' }}>
                {/* --- 임시 코드 시작 --- */}
                <input type="file" onChange={handleFileChange} />
                {/* --- 임시 코드 끝 --- */}
                <WritePostHeader onSubmit={handleSubmit} />
                <div className={styles.content_container}>
                    <input 
                        className={styles.title} 
                        type='text' 
                        placeholder='제목'
                        value={title} // 제목 상태 변수와 연결
                        onChange={(e) => setTitle(e.target.value)} // 상태 업데이트 함수
                    />
                    <textarea 
                        className={styles.content} 
                        placeholder='함께 공유하고 싶은 내용을 남겨보세요.'
                        value={content} // 내용 상태 변수와 연결
                        onChange={(e) => setContent(e.target.value)} // 상태 업데이트 함수
                    />
                </div>
                <WritePostFooter />
            </div>
        </div>
    )
}

export default WritePost;