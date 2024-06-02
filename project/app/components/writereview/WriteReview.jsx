"use client";
import styles from "@/app/modules/writepostCss/writepost.module.scss";
import WriteReviewHeader from "./WriteReviewHeader";
import WriteReviewFooter from "./WriteReviewFooter";
import useSelectedBox from "@/app/zustand/selectionStore";
import useVotedListBox from "@/app/zustand/votedListStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import userimg from "@/app/public/image/userimg.png";
import closebtn from "@/app/public/image/close_round.png";
import selectimg1 from "@/app/public/image/select1.png";
import selectimg2 from "@/app/public/image/select2.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import deleteimg from "@/app/public/image/delete.png";
import Toast from "../toast/Toast";

const WriteReview = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { selectedBoxData, clearSelectedBox } = useSelectedBox();
  const { setVotedBoxData } = useVotedListBox();
  const [file, setFile] = useState([]);

  // const [showToast, setShowToast] = useState(false);
  // const [toastMessage, setToastMessage] = useState("");

  const getMyPost = async () => {
    try {
      if (typeof window !== "undefined") {
        const atkToken = localStorage.getItem("token");

        if (atkToken) {
          const page = 0;
          const size = 6;

          const url = new URL(
            "https://dev.gomin-chingu.site/posts/poll-postList"
          );
          url.searchParams.append("page", page);
          url.searchParams.append("size", size);

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              atk: atkToken,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setVotedBoxData(data.result.candidatePostDTOList);
            console.log("MyPage data:", data);
          } else {
            console.error("Failed to get MyPage data:", response);
          }
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  //이미지 업로드 함수
  const handleUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (file.length + selectedFiles.length > 4) {
      console.log("최대 4개의 이미지까지만 업로드할 수 있습니다.");
      setToastMessage("최대 이미지 4개");
      setShowToast(true);
      return;
    }

    const readers = selectedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Base64로 인코딩합니다.
      });
    });

    Promise.all(readers)
      .then((results) => {
        setFile((prevFiles) => [...prevFiles, ...results]); // 파일 배열에 추가합니다.
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  //이미지 삭제함수
  const removeImage = (index) => {
    setFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  //토스트 메세지 표출

  const handleToastClose = () => {
    setShowToast(false);
  };

  useEffect(() => {
    if (selectedBoxData) {
      console.log("Selected Box Data:", selectedBoxData);
    }
    getMyPost();
  }, [selectedBoxData]);

  return (
    <div>
      <div className={styles.container} style={{ background: "white" }}>
        <WriteReviewHeader
          title={title}
          content={content}
          handleClear={clearSelectedBox}
          files={file}
        />
        <div className={styles.content_footer_container}>
          <div className={styles.content_container}>
            <input
              className={styles.title}
              type="text"
              placeholder="제목"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles.write_content_container}>
              <textarea
                className={styles.content}
                placeholder="함께 공유하고 싶은 내용을 남겨보세요."
                onChange={(e) => setContent(e.target.value)}
              />

              {/* 선택된 이미지 표출 */}
              <div className={styles.all_img_wrapper}>
                {file.map((file, index) => (
                  <div key={index}>
                    <img
                      src={file}
                      className={styles.image_wrapper}
                      alt={`Uploaded File ${index + 1}`}
                    />
                    <Image
                      src={deleteimg}
                      alt="삭제"
                      width={24}
                      height={24}
                      onClick={() => removeImage(index)}
                    />
                  </div>
                ))}
                {/* 토스트메세지 왜안나옴 ㅠ */}
                {/* {showToast && (
                  <Toast message={toastMessage} onClose={handleToastClose} />
                )} */}
              </div>

              <div className={styles.pull_review}>
                {selectedBoxData && (
                  <div className={styles.box}>
                    <div className={styles.pull_review_header}>
                      <div className={styles.header_userinfo}>
                        <Image
                          src={userimg}
                          className={styles.userimg}
                          alt="유저 이미지"
                          width={24}
                          height={24}
                        />
                        <div className={styles.nickname}>nickname</div>
                      </div>
                      <Image
                        src={closebtn}
                        className={styles.closebtn}
                        alt="닫힘"
                        width={24}
                        height={24}
                        onClick={() => {
                          clearSelectedBox();
                        }}
                      />
                    </div>
                    <div className={styles.pull_review_container}>
                      <div className={styles.pull_review_title}>
                        {selectedBoxData.title}
                      </div>
                      <div className={styles.pull_review_content}>
                        {selectedBoxData.content}
                      </div>
                      <div className={styles.pull_reivew_select}></div>
                      <div className={styles.footer}>
                        <div className={styles.like}>
                          <Image
                            src={likeimg}
                            alt="좋아요"
                            width={15}
                            height={13}
                          />{" "}
                          {selectedBoxData.like}
                        </div>
                        <div className={styles.comment}>
                          <Image
                            src={commentimg}
                            alt="댓글"
                            width={15}
                            height={13}
                          />{" "}
                          {selectedBoxData.comment}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.write_review_footer_container}>
            <WriteReviewFooter onUpload={handleUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
