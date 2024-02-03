'use client'
import styles from '@/app/modules/writepostCss/writepost.module.scss'
import WriteReviewHeader from "./WriteReviewHeader"
import WriteReviewFooter from "./WriteReviewFooter"
import useSelectedBox from '@/app/zustand/selectionStore'
import { useEffect, useState } from 'react'
import Image from "next/image";

import userimg from "@/app/public/image/userimg.png";
import closebtn from "@/app/public/image/close_round.png";
import selectimg1 from "@/app/public/image/select1.png";
import selectimg2 from "@/app/public/image/select2.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";

const WriteReview = () => {
    const { selectedBoxData } = useSelectedBox();

    useEffect(() => {
        // Zustand에서 가져온 데이터가 변경될 때마다 UI 업데이트
        if (selectedBoxData) {
        // 여기서 가져온 데이터를 UI에 적용하거나 로직을 수행할 수 있습니다.
        console.log('Selected Box Data:', selectedBoxData);
        }
    }, [selectedBoxData]);
    return (
        <div>
          <div className={styles.full_container}>
            <WriteReviewHeader />
            <div className={styles.content_footer_container}>
              <div className={styles.content_container}>
                <input className={styles.title} type="text" placeholder="제목" />
                <div className={styles.write_content_container}>
                  <textarea
                    className={styles.content}
                    placeholder="함께 공유하고 싶은 내용을 남겨보세요."
                  />
                  <div className={styles.pull_review}>
                    {/* ---- 여기서 Zustand에서 가져온 데이터를 UI에 표시 시작 ---- */}
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
                            />
                          </div>
                          <div className={styles.pull_review_container}>
                            <div className={styles.pull_review_title}>{selectedBoxData.title}</div>
                            <div className={styles.pull_review_content}>{selectedBoxData.content}</div>
                            <div className={styles.pull_reivew_select}>
                              <Image src={selectimg1} alt="선택지 1" width={98} height={124} />
                              <Image src={selectimg2} alt="선택지 2" width={98} height={124} />
                            </div>
                    
                            <div className={styles.footer}>
                              <div className={styles.like}>
                                <Image src={likeimg} alt="좋아요" width={15} height={13} /> {selectedBoxData.goodCount}
                              </div>
                              <div className={styles.comment}>
                                <Image src={commentimg} alt="댓글" width={15} height={13} /> {selectedBoxData.messageCount}
                              </div>
                            </div>
                          </div>
                        </div>
                    )}
                    {/* ---- 여기서 Zustand에서 가져온 데이터를 UI에 표시 끝 ---- */}
                  </div>
                </div>
              </div>
              <div className={styles.write_review_footer_container}>
                <WriteReviewFooter />
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default WriteReview;