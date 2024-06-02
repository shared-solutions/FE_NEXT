"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "@/app/modules/writepostCss/writepost.module.scss";

import useVoteStore from "@/app/zustand/normalVoteStore";
import useGeneralVoteStore from "@/app/zustand/generalVoteStore";
import WritePostHeader from "./WritePostHeader";
import WritePostFooter from "./WritePostFooter";
import useWriteVoteStore from "@/app/zustand/voteStore";


const WritePost = () => {
    //zustand
    const CardItem = useVoteStore.getState().voteCardItems;
    const GeneralItem = useGeneralVoteStore.getState().voteGeneralItems;
    const selectedCategory = useWriteVoteStore((state) => state.selectedCategory);
    const typeNum = useWriteVoteStore.getState().selectedVoteType;
    const voteTitle = useWriteVoteStore((state) => state.voteTitle);
    const { voteDeadline, } = useWriteVoteStore();
    //private
    //third party
    const router = useRouter();
    //variable
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState(""); 
    const [isWrote, setIsWrote] = useState(false);
    //hook
    useEffect(()=>{
        if (title.length >= 5 && content.length >=5) {
        setIsWrote(true);
        }
        else{
        setIsWrote(false)
        }
    },[title,content])

    //functions
    const handleSubmit = async () => {
        try {
        const authToken = localStorage.getItem("token");
        const formData = new FormData();
        formData.append(
            "request",
            JSON.stringify({
            title: title,
            content: content,
            category: selectedCategory,
            postType: 1,
            postVoteType: typeNum, 
            pollTitle: voteTitle, 
            multipleChoice: false,
            parent_id: null,
            deadline: voteDeadline,
            point: useWriteVoteStore.getState().selectedPoint,
            filBase64List: [],
            })
        );
        const response = await axios.post(
            "https://dev.gomin-chingu.site/posts/",
            formData,
            {
            headers: {
                atk: authToken,
                "Content-Type": "multipart/form-data",
            },
            }
        );
        const postId = response.data.result.postId;
        if( typeNum ===1||typeNum===3)
        {
            const candidateCount = typeNum === 3 ? CardItem?.length : GeneralItem.length; // 후보 개수 받아오기
            for (let i = 0; i < candidateCount; i++) {
                let ImgUrl = typeNum === 3 ? CardItem[i].image : GeneralItem[i].image;
                let OpString = typeNum === 3 ? CardItem[i].placeholder : GeneralItem[i].placeholder || ''; 
                const candidateFormData = new FormData();
                candidateFormData.append("post-id", postId);
                candidateFormData.append("optionString", OpString); 
                candidateFormData.append("optionImg", ImgUrl); 
                candidateFormData.append("atk", authToken);
                const candidateResponse = await axios.post(
                `https://dev.gomin-chingu.site/posts/${postId}`,
                candidateFormData,
                {
                    headers: {
                    "Content-Type": "application/json",
                    atk: authToken,
                    },
                }
                );
                if(response.status ===200){
                console.log(`후보 ${i + 1} 생성 요청 성공:`, candidateResponse.data);
                console.log("voteTitle: ", voteTitle);
                console.log("title:", title);
                router.replace('/vote')
                }
                else{
                alert("잠시만 기다려주세요..!")
                }
                
            }
        }
        else{
            router.replace('/vote')
        }
        // 두 번째 POST 요청 시작 => postId를 받아서 -> 후보 개수만큼 후보 생성 api POST
        
        } catch (error) {
        console.error("요청 실패:", error);
        }
    };
    return (
        <div>
            <div className={styles.container} style={{ background: "white" }}>
                <WritePostHeader
                voteTitle={voteTitle}
                selectedCategory={selectedCategory}
                onSubmit={handleSubmit}
                />
                <div className={styles.content_container}>
                <input
                    className={styles.title}
                    type="text"
                    placeholder="제목(5자 이상)"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea
                    className={styles.content}
                    placeholder="함께 공유하고 싶은 내용을 남겨보세요.(5자 이상)"
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                />
                </div>
                <WritePostFooter isWrote={isWrote} />
            </div>
        </div>
    );
    };

export default WritePost;
