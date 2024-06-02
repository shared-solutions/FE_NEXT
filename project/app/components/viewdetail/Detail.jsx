import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "react-spring-bottom-sheet/dist/style.css";
import styles from "@/app/modules/viewdetailCss/detail.module.scss";
//zustand
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";
//assets
import moreimg from "@/app/public/image/moreimg.png";
import timerimg from "@/app/public/image/timer.png";
import countview from "@/app/public/image/countview.png";
import likeimg from "@/app/public/image/like.png";
import commentimg from "@/app/public/image/comment.png";
import rerenderimg from "@/app/public/image/rerender.png";
import likeunclickimg from "@/app/public/image/likeunclick.png";
import chatclickimg from "@/app/public/image/chatclick.png";
import good from "@/app/public/image/finger.png";
import defaultUserImg from "@/app/public/image/defaultUserImg.png";
//components
import { CommentSort } from "../comment/CommentSort";
import GeneralVoteBox from "@/app/components/postlist/GeneralVoteBox";
import CardVoteBox from "@/app/components/postlist/CardVoteBox";
import GaugeVoteBox from "@/app/components/postlist/GaugeVoteBox";


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
}) 
{
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
    const { selectList, position } = useSelectVoteStore();

    let type;

    const router = useRouter();

    const [setting, setSetting] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isScrap, setIsScrap] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);

    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const datePart = `${year}-${month}-${day}`;

    const timePart = dateObject.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });

    const defaultPostProps = {
        userimg: userImg || defaultUserImg,
        nickname: username || "",
        title: title || "",
        content: content || "",
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

    if (postVoteType === "CARD") {
        type = "cardVote";
    } else if (postVoteType === "GENERAL") {
        type = "generalVote";
    } else {
        type = "gaugeVote";
    }

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
            alert("좋아요 해제했습니다.");
            window.location.reload();
        } 
        else {
            console.error("Voting failed:", response);
        }
        } 
        catch (error) {
            console.error("Error:", error);
        }
    };

    const clickHandler = () => {
        setIsButtonClicked(!isButtonClicked);
    };

    const scrapHandler = async () => {
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
            alert("스크랩했습니다.");
        } else {
            console.error("Voting failed:", response);
        }
        } 
        catch (error) {
        console.error("Error:", error);
        }
    };

    const delScrapHandler = async () => {
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
            alert("스크랩 해제했습니다.");
        } else {
            console.error("Voting failed:", response);
        }
        } 
        catch (error) {
        console.error("Error:", error);
        }
    };

    const modifyPostHandler = async () => {
        try {
        const atkToken = localStorage.getItem("token");
        const response = await fetch(
            `https://dev.gomin-chingu.site/posts/${postId}/edit`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                atk: atkToken,
            },
            body: JSON.stringify({ title: editedTitle, content: editedContent ,voteOnGoing: true}),
            }
        );
        if (response.ok) {
            alert("수정이 완료되었습니다.");
            setIsEditing(false);
            router.replace("/vote");
        } else {
            console.error("Edit failed:", response);
        }
        } 
        catch (error) {
            console.error("Error:", error);
        }
    };

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
            alert("글을 삭제했습니다.");
            router.replace("/vote");
        } else {
            console.error("Delete failed:", response);
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };

    return (
        <>
        <div className={styles.container}>
            <div className={setting ? styles.content_container_blur : styles.content_container}>
                <div className={styles.without_vote_container}>
                    <div className={styles.userlay}>
                        <Image
                            className={styles.userimg}
                            src={userImg === null ? defaultUserImg : userImg}
                            alt="유저 이미지"
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%" }}
                        />
                        <div className={styles.username}>{username}</div>
                        <br />

                        <div className={styles.morebtn} onClick={() => clickHandler()}>
                            {isButtonClicked ? (
                            <div className={styles.more_container}>
                                <p onClick={() => {
                                    clickHandler();
                                    setIsEditing(true);
                                }}>수정</p>

                                <p onClick={() => clickHandler()}>알림 끄기</p>
                                {isScrap ? (
                                <p onClick={() => {
                                    clickHandler();
                                    handleScrapClick();
                                    }}>스크랩 해제</p>
                                ) : 
                                (
                                <p onClick={() => {
                                    clickHandler();
                                    handleScrapClick();
                                    }}>스크랩</p>
                                )
                                }
                                <p onClick={() => clickHandler()}>신고하기</p>
                                {myPost && (
                                <p onClick={() => {
                                    clickHandler();
                                    handleDeleteClick();
                                    }}>삭제하기</p>
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
                            onClick={() => clickHandler()}
                            />
                        </div>
                    </div>
                    <div className={styles.usertext}>
                        <div className={styles.date}>{datePart}</div>
                        <div className={styles.line}> | </div>
                        <div className={styles.time}>{timePart}</div>
                    </div>
                    {isEditing ? (
                    <div className={styles.editContainer}>
                        <input
                        type="text"
                        placeholder="제목 수정"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <textarea
                        value={editedContent}
                        placeholder="내용 수정"
                        onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className={styles.modifyButton}>
                            <button onClick={modifyPostHandler} className={styles.saveButton}>
                            저장
                            </button>
                            <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                                취소
                            </button>
                        </div>
                        
                    </div>
                    ) : (
                    <>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.content}>{content}</div>
                    </>
                    )}
                </div>

                <div className={styles.vote_container}>
                    <div className={styles.minititle}>
                    <div className={styles.mini}>{pollTitle}</div>
                    {onGoing &&
                        !myPost &&
                        (isVoted ? (
                        <div className={styles.point_done}>투표완료</div>
                        ) : (
                        <div
                            className={styles.point}
                            onClick={() => timeDifference > 0 && handleVote()}
                            style={onGoing ? null : { display: "none" }}
                        >투표하기</div>
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
                            <GaugeVoteBox {...defaultPostProps} myPost={myPost} />
                        ) : null}
                    </div>
                </div>

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