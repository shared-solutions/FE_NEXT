"use client";
import axios from 'axios';
import styles from '@/app/modules/writepostCss/writepostheader.module.scss'
import Image from 'next/image'
import Link from "next/link"
import useSelectedBox from '@/app/zustand/selectionStore'
import close from '../../public/image/close.ico'
import { useState } from 'react'
import { useRouter } from "next/navigation";

const WriteReviewHeader = ({title, content}) => {
    const router = useRouter();
    const authToken = localStorage.getItem("token");
    const { selectedBoxData } = useSelectedBox();
    
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };
    //console.log(selectedBoxData.postId);
    //console.log(selectedBoxData.createdAt);
    const handleSubmit = async () => {
        console.log(title);
        console.log(content);
        
        try {
            const formData = new FormData();
            formData.append('request', JSON.stringify({
                title: title,
                content: content,
                //----- 후기는 아래값 고정 -----
                category: null,
                postType: 2,
                postVoteType: 0,
                pollTitle: null,
                multipleChoice: false,
                parent_id: selectedBoxData.postId,
                deadline: null,
                point: 0,
            }));
            formData.append('file', file);

            const response = await axios.post('https://dev.gomin-chingu.site/posts/', formData, {
                headers: {
                    atk : authToken,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log('Post 요청 성공:', response.data);
            router.replace("/review");
               
        } catch (error) {
            console.error('Post 요청 실패:', error);
        }
    };
    return (
        <div className={styles.header_container}>
            <Link href="/review">
                <Image
                    src={close}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </Link>
            <h4>고민 후기 작성하기</h4>
            <button className={styles.complete_button} onClick={handleSubmit}>완료</button>
        </div>
    )
}

export default WriteReviewHeader;