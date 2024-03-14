"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/app/modules/writepostCss/writepost.module.scss";
import useVoteStore from "@/app/zustand/normalVoteStore";
import useGeneralVoteStore from "@/app/zustand/generalVoteStore";
import WritePostHeader from "./WritePostHeader";
import WritePostFooter from "./WritePostFooter";
import useWriteVoteStore from "@/app/zustand/voteStore";
import { useRouter } from "next/navigation";

const WritePost = () => {
  const CardItem = useVoteStore.getState().voteCardItems;
  const GeneralItem = useGeneralVoteStore.getState().voteGeneralItems;
  console.log("카드", CardItem);
  console.log("일반", GeneralItem);
  const [title, setTitle] = useState(""); // 제목 상태 변수
  const [content, setContent] = useState(""); // 내용 상태 변수
  const [file, setFile] = useState(null);
  const voteTitle = useWriteVoteStore((state) => state.voteTitle); // Zustand에서 투표 제목 가져오기
  const selectedCategory = useWriteVoteStore((state) => state.selectedCategory); // Zustand에서 카테고리 가져오기
  const { voteDeadline, } = useWriteVoteStore();
  const typeNum = useWriteVoteStore.getState().selectedVoteType;
  const router = useRouter()
  const [isWrote, setIsWrote] = useState(false);
  useEffect(()=>{
    if (title.length >= 5 && content.length >=5) {
      setIsWrote(true);
    }
    else{
      setIsWrote(false)
    }
  },[title,content])
  const handleSubmit = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const formData = new FormData();
      formData.append(
        "request",
        JSON.stringify({
          title: title,
          content: content,
          // ----- 하드코딩 시작 -----
          category: selectedCategory,
          postType: 1,
          postVoteType: typeNum, // 게이지로 하드코딩
          pollTitle: voteTitle, // postVoteType: 2(Gauge) 인 경우에만 전체보기에 GET
          multipleChoice: false,
          parent_id: null,
          deadline: voteDeadline,
          // deadline: voteDeadline.toISOString(),
          // deadline: formatDateTimeForServer(voteDeadline),
          // deadline: voteDeadline ? voteDeadline.toISOString() : null,
          point: useWriteVoteStore.getState().selectedPoint,
          // ----- 하드코딩 끝 -----
          filBase64List: [],
        })
      );

      console.log("투표타입", typeNum);
      // 첫 번째 POST 요청
      console.log(formData);
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

      console.log("첫 번째 POST 요청 성공:", response.data);

      // postId 추출
      const postId = response.data.result.postId;
      console.log("postId 추출 성공:", postId);
      if( typeNum ===1||typeNum===3)
      {
         const candidateCount = typeNum === 3 ? CardItem?.length : GeneralItem.length; // 후보 개수 받아오기

      for (let i = 0; i < candidateCount; i++) {
        let ImgUrl = typeNum === 3 ? CardItem[i].image : GeneralItem[i].image;
        let OpString = typeNum === 3 ? CardItem[i].placeholder : GeneralItem[i].placeholder || ''; 
        const candidateFormData = new FormData();
        candidateFormData.append("post-id", postId);
        candidateFormData.append("optionString", OpString); // optionString 받아오기
        candidateFormData.append("optionImg", ImgUrl); // optionImgUrl 받아오기
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
        console.log("게이지투표작성성공")
        router.replace('/vote')
      }
      // 두 번째 POST 요청 시작 => postId를 받아서 -> 후보 개수만큼 후보 생성 api POST
     
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };
  console.log(isWrote)
  return (
    <div>
      <div className={styles.container} style={{ background: "white" }}>
        {/* --- 임시 코드 시작 --- */}
        {/* --- 임시 코드 끝 --- */}
        <WritePostHeader
          voteTitle={voteTitle}
          selectedCategory={selectedCategory}
          onSubmit={handleSubmit}
        />
        <div className={styles.content_container}>
          <input
            className={styles.title}
            type="text"
            placeholder="제목"
            value={title} // 제목 상태 변수와 연결
            onChange={(e) => setTitle(e.target.value)} // 상태 업데이트 함수
          />
          <textarea
            className={styles.content}
            placeholder="함께 공유하고 싶은 내용을 남겨보세요."
            value={content} // 내용 상태 변수와 연결
            onChange={(e) => setContent(e.target.value)} // 상태 업데이트 함수
          />
        </div>
        <WritePostFooter isWrote={isWrote} />
      </div>
    </div>
  );
};

export default WritePost;
