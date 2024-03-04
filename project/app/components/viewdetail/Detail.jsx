"use client";
import styles from "@/app/modules/viewdetailCss/detail.module.scss";
import userimg from "@/app/public/image/userimg.png";
import moreimg from "@/app/public/image/moreimg.png";
import select1 from "@/app/public/image/select1.png";
import timerimg from "@/app/public/image/timer.png";
import countview from "@/app/public/image/countview.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import rerenderimg from "@/app/public/image/rerender.png";
import likeunclickimg from "@/app/public/image/likeunclick.png";
import chatclickimg from "@/app/public/image/chatclick.png";
import Image from "next/image";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { CommentSort } from "../comment/CommentSort";
import backimg from "@/app/public/image/arrow3.png";
import Link from "next/link";
import good from "@/app/public/image/finger.png";
import { postLike } from "@/app/api/api/like";
import { deleteLike } from "@/app/api/api/like";
import GeneralVoteBox from "@/app/components/postlist/GeneralVoteBox";
import CardVoteBox from "@/app/components/postlist/CardVoteBox";
import GaugeVoteBox from "@/app/components/postlist/GaugeVoteBox";
import defaultUserImg from "@/app/public/image/userimg.png";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";
import MenuPage from "@/app/components/menu/MenuPage";
import { useSelectedLayoutSegments } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Detail({
  postId,
  username,
  userImg,
  date,
  deadline,
  title,
  content,
  pollTitle,
  point,
  postVoteType,
  viewCount,
  likeCount,
  commentCount,
  isLike,
  myPost,
  selectImgList,
}) {
  const router = useRouter();

  const [setting, setSetting] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isScrap, setIsScrap] = useState(false);

  const {
    allCandidatePercent,
    topCandidatePercent,
    topCandidate,
    topVoteResult,
    userVote,
    userVotePercent,
    userVoteResult,
    pollOption,
    totalGauge,
    userGauge,
    isVoted,
    onGoing,
  } = voteDetailStore();

  console.log(voteDetailStore());
  const defaultPostProps = {
    userimg: userImg || defaultUserImg,
    nickname: username || "",
    title: title || "",
    content: content || "",
    //pollOption: pollOption || [],
    like: likeCount || 0,
    comment: commentCount || 0,
  };
  const handleLikeClick = () => {
    if (isLike) {
      handleDeleteLike();
    } else {
      handlePostLike();
    }
  };
  const handleScrapClick = () => {
    setIsScrap((prevIsScrap) => !prevIsScrap);

    if (isScrap) {
      delScrapHandler();
    } else {
      scrapHandler();
    }
  };
  const handleDeleteClick = () => {
    deletePostHandler();
  };
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const datePart = `${year}-${month}-${day}`;

  const timeePart = dateObject.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  let lefttime;
  const timeDifference = new Date(deadline) - new Date();
  let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesDifference = Math.floor(timeDifference / (1000 * 60));
  if (daysDifference >= 1) {
    lefttime = daysDifference + "일";
  } else if (hoursDifference >= 1) {
    lefttime = hoursDifference + "시간";
  } else {
    lefttime = minutesDifference + "분";
  }
  console.log(postVoteType);

  const { selectList, position } = useSelectVoteStore();
  let type;
  if (postVoteType === "CARD") {
    type = "cardVote";
  } else if (postVoteType === "GENERAL") {
    type = "generalVote";
  } else {
    type = "gaugeVote";
  }

  // 투표하기 api selectedList 저장 필요
  const handleVote = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const url = `https://dev.gomin-chingu.site/posts/${postId}/${type}`;
      const requestBody =
        postVoteType === "GAUGE" ? { value: position } : { selectList };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          atk: authToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Voting success:", result);
        alert("투표했습니다!");
        window.location.reload();
      } else {
        console.error("Voting failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostLike = async () => {
    console.log("좋아요 누름");
    try {
      const atkToken = localStorage.getItem("token");

      const response = await fetch(
        `https://dev.gomin-chingu.site/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            atk: atkToken,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Voting success:", result);
        alert("게시글을 좋아요했습니다!");
        window.location.reload();
      } else {
        console.error("failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteLike = async () => {
    console.log("좋아요 누름");
    try {
      const atkToken = localStorage.getItem("token");

      const response = await fetch(
        `https://dev.gomin-chingu.site/posts/${postId}/like/del`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            atk: atkToken,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Delete success:", result);
        alert("좋아요 해제했습니다.");
        window.location.reload();
      } else {
        console.error("Voting failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const clickHandler = () => {
    setIsButtonClicked(!isButtonClicked);
  };
  const scrapHandler = async () => {
    console.log(" 누름");
    try {
      const atkToken = localStorage.getItem("token");

      const response = await fetch(
        `https://dev.gomin-chingu.site/posts/${postId}/scrap`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            atk: atkToken,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("success:", result);
        //setIsScrap((prevscrap) => !prevscrap);
        alert("스크랩했습니다.");
      } else {
        console.error("Voting failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const delScrapHandler = async () => {
    console.log(" 누름");
    try {
      const atkToken = localStorage.getItem("token");

      const response = await fetch(
        `https://dev.gomin-chingu.site/posts/${postId}/scrap/del`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            atk: atkToken,
          },
        }
      );
      if (response.ok) {
        //setIsScrap((prevscrap) => !prevscrap);
        const result = await response.json();
        console.log("success:", result);
        alert("스크랩 해제했습니다.");
      } else {
        console.error("Voting failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 글 삭제
  const deletePostHandler = async () => {
    try {
      const atkToken = localStorage.getItem("token");

      const response = await fetch(
        `https://dev.gomin-chingu.site/posts/${postId}/del`,
        {
          method: "PATCH",
          headers: {
            atk: atkToken,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("success:", result);
        alert("글을 삭제했습니다.");
        router.replace("/vote");
      } else {
        console.error("Delete failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const segment = useSelectedLayoutSegments();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && <MenuPage isOpen={isMenuOpen} onClose={closeMenu} />}
      <div className={styles.container}>
        {/* 추후에 경로 수정 필요 */}
        {/* ===== 상단바 시작 ==== */}
        <div className={styles.header_container}>
          <div className={styles.logo}>
            <Link href="/vote">
              <Image src={backimg} alt="back" width={18} height={18} />
            </Link>
          </div>
          <div className={styles.menu_container}>
            <div className={styles.menu}>
              <Link href="/notification">
                {segment[1] === "notification" ? (
                  <>
                    <Bell />
                  </>
                ) : (
                  <>
                    <Bell />
                  </>
                )}
              </Link>
              <Link href="/search">
                {segment[1] === "search" ? (
                  <>
                    <Search />
                  </>
                ) : (
                  <>
                    <Search />
                  </>
                )}
              </Link>
              <div onClick={toggleMenu}>
                {segment[1] === "menu" ? (
                  <>
                    <Menu />
                  </>
                ) : (
                  <>
                    <Menu />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ===== 상단바 끝 ==== */}

        <div
          className={
            setting ? styles.content_container_blur : styles.content_container
          }
        >
          <div className={styles.without_vote_container}>
            <div className={styles.userlay}>
              <Image
                className={styles.userimg}
                src={userImg == null ? userimg : userImg}
                alt="유저 이미지"
                width={34}
                height={34}
                style={{ borderRadius: "50%" }}
              />
              <div className={styles.username}>{username}</div>
              <br />

              <div className={styles.morebtn} onClick={() => clickHandler()}>
                {isButtonClicked ? (
                  <div className={styles.more_container}>
                    <p onClick={() => clickHandler()}>수정</p>
                    <p onClick={() => clickHandler()}>알림 끄기</p>
                    {isScrap ? (
                      <p
                        onClick={() => {
                          clickHandler();
                          handleScrapClick();
                        }}
                      >
                        스크랩 해제
                      </p>
                    ) : (
                      <p
                        onClick={() => {
                          clickHandler();
                          handleScrapClick();
                        }}
                      >
                        스크랩
                      </p>
                    )}
                    <p onClick={() => clickHandler()}>신고하기</p>
                    {myPost && (
                      <p
                        onClick={() => {
                          clickHandler();
                          handleDeleteClick();
                        }}
                      >
                        삭제하기
                      </p>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <Image
                  className={styles.rerender}
                  src={rerenderimg}
                  alt="렌더링"
                  width={12}
                  height={12}
                />
                <Image
                  src={moreimg}
                  alt="더보기"
                  width={3}
                  height={13}
                  onClick={() => clickHandler}
                />
              </div>
            </div>
            <div className={styles.usertext}>
              <div className={styles.date}>{datePart}</div>
              <div className={styles.line}> | </div>
              <div className={styles.time}>{timeePart}</div>
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
          </div>

          {/* ==== 투표창 시작 ==== */}
          <div className={styles.vote_container}>
            <div className={styles.minititle}>
              <div className={styles.mini}>{pollTitle}</div>
              {onGoing &&
                !myPost &&
                (isVoted ? (
                  <div
                    className={styles.point_done}
                    /*disabled={!onGoing || timeDifference <= 0}*/
                  >
                    투표완료
                  </div>
                ) : (
                  <div
                    className={styles.point}
                    //disabled={isVoted || !onGoing || timeDifference <= 0}
                    onClick={() => timeDifference > 0 && handleVote()}
                    style={onGoing ? null : { display: "none" }}
                  >
                    투표하기
                  </div>
                ))}
            </div>
            <div className={styles.timer}>
              <div className={styles.pointnum}>채택 포인트: {point}</div>
              <div>|</div>
              <Image
                className={styles.timeimg}
                src={timerimg}
                alt="타이머 이미지"
                width={13}
                height={13}
              />
              <div>
                {timeDifference <= 0 ? "마감되었습니다" : `마감 ${lefttime}전`}
              </div>
            </div>

            <div className={styles.imgSlide}>
              {postVoteType === "GENERAL" ? (
                <GeneralVoteBox
                  {...defaultPostProps}
                  postId={postId}
                  allCandidatePercent={allCandidatePercent}
                  topCandidate={topCandidate}
                  topCandidatePercent={topCandidatePercent}
                  topVoteResult={topVoteResult}
                  userVote={userVote}
                  userVotePercent={userVotePercent}
                  userVoteResult={userVoteResult}
                  pollOption={pollOption}
                  isVoted={isVoted}
                  onGoing={onGoing}
                />
              ) : postVoteType === "CARD" ? (
                <CardVoteBox
                  {...defaultPostProps}
                  postId={postId}
                  allCandidatePercent={allCandidatePercent}
                  topCandidate={topCandidate}
                  topCandidatePercent={topCandidatePercent}
                  topVoteResult={topVoteResult}
                  userVote={userVote}
                  userVotePercent={userVotePercent}
                  userVoteResult={userVoteResult}
                  pollOption={pollOption}
                  isVoted={isVoted}
                  onGoing={onGoing}
                />
              ) : postVoteType === "GAUGE" ? (
                <GaugeVoteBox {...defaultPostProps} myPost={myPost}/>
              ) : null}
              {/*pollOption &&
                pollOption.map((optionImgUrl, optionString, index) => (
                  <>
                    <Image
                      key={index}
                      src={optionImgUrl && optionImgUrl}
                      alt={`선택지 ${index + 1}`}
                      width={98}
                      height={124}
                    />
                    <p>{optionString}</p>
                  </>
                ))*/}
            </div>
          </div>
          {/* ==== 투표창 끝 ==== */}

          <div className={styles.without_vote_container}>
            <div className={styles.footer}>
              <div className={styles.countview}>
                <Image
                  className={styles.img}
                  src={countview}
                  alt="조회수"
                  width={14}
                  height={10}
                />
                {viewCount}
              </div>
              <div className={styles.like}>
                <Image
                  className={styles.img}
                  src={likeimg}
                  alt="좋아요수"
                  width={14}
                  height={10}
                />
                {likeCount}
              </div>
              <div className={styles.comment}>
                <Image
                  className={styles.img}
                  src={commentimg}
                  alt="댓글수"
                  width={14}
                  height={10}
                />
                {commentCount}
              </div>
            </div>

            <div className={styles.underlay}>
              <div key={isLike ? "like" : "unlike"}>
                <Image
                  src={isLike ? good : likeunclickimg}
                  alt={isLike ? "좋아요누름" : "좋아요 취소"}
                  width={37}
                  height={35}
                  onClick={handleLikeClick}
                />
              </div>
              <Image
                onClick={() => {
                  setSetting(!setting);
                  console.log("클릭");
                }}
                src={chatclickimg}
                alt="채팅 클릭"
                width={35}
                height={35}
              />
              {setting && (
                <CommentSort
                  postId={postId}
                  onClose={() => {
                    setSetting(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
