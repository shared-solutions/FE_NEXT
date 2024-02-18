"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/app/modules/writepostCss/writepost.module.scss";
import useVoteStore from "@/app/zustand/normalVoteStore";

import WritePostHeader from "./WritePostHeader";
import WritePostFooter from "./WritePostFooter";
import useWriteVoteStore from "@/app/zustand/voteStore";

const WritePost = () => {
  const CardItem = useVoteStore.getState().voteCardItems;
  console.log(CardItem);
  const [title, setTitle] = useState(""); // 제목 상태 변수
  const [content, setContent] = useState(""); // 내용 상태 변수
  const [file, setFile] = useState(null);
  const voteTitle = useWriteVoteStore((state) => state.voteTitle); // Zustand에서 투표 제목 가져오기
  const selectedCategory = useWriteVoteStore((state) => state.selectedCategory); // Zustand에서 카테고리 가져오기
  const voteDeadline = useWriteVoteStore((state) => state.voteDeadline);
  const typeNum = useWriteVoteStore.getState().selectedVoteType;

  console.log(typeNum);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 원하는 형식으로 날짜와 시간을 포맷하는 함수
  // const formatDateTimeForServer = (dateTime) => {
  //     return dateTime.toISOString(); // 예시: "2024-02-18T02:16:56.811Z"
  // };

  // voteTitle 잘 들어가는지 확인

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
          postVoteType: typeNum,
          pollTitle: voteTitle, // postVoteType: 2(Gauge) 인 경우에만 전체보기에 GET
          multipleChoice: true,
          parent_id: 0,
          deadline: "2024-02-23T02:16:56.811Z",
          // deadline: voteDeadline.toISOString(),
          // deadline: formatDateTimeForServer(voteDeadline),
          // deadline: voteDeadline ? voteDeadline.toISOString() : null,
          point: useWriteVoteStore.getState().selectedPoint,
          // ----- 하드코딩 끝 -----
        })
      );
      formData.append("file", file);

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

      // 두 번째 POST 요청 시작 => postId를 받아서 -> 후보 개수만큼 후보 생성 api POST
      const candidateCount = CardItem?.length; // 후보 개수 받아오기

      for (let i = 0; i < candidateCount; i++) {
        let ImgUrl = CardItem[i].image;
        let OpString = CardItem[i].placeholder;
        const candidateFormData = new FormData();
        candidateFormData.append("post-id", postId);
        candidateFormData.append("optionString", OpString); // optionString 받아오기
        candidateFormData.append("optionImgUrl", ImgUrl); // optionImgUrl 받아오기
        candidateFormData.append("atk", authToken);

        const candidateResponse = await axios.post(
          `https://dev.gomin-chingu.site/posts/${postId}`,
          candidateFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              atk: authToken,
            },
          }
        );
        console.log(`후보 ${i + 1} 생성 요청 성공:`, candidateResponse.data);
        console.log("voteTitle: ", voteTitle);
        console.log("title:", title);
      }
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };
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
        <WritePostFooter />
      </div>
    </div>
  );
};

export default WritePost;
