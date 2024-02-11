import { Bottom } from "./Bottom";
import { useState } from "react";
import CommentBody from "./CommentBody";
import CommentInput from "../input/CommentInput";
import { ReCommentInput } from "../input/CommentInput";
import { lookupComment, postComment } from "@/app/api/api/comment";
import { useEffect } from "react";
import styles from "@/app/modules/commentCss/commentBody.module.scss";
import likeimg from "@/app/public/image/like.png";
import moreimg from "@/app/public/image/morebtncomment.png";
import Image from "next/image";
import user from "@/app/public/image/userimg.png";
import { deleteComment } from "@/app/api/api/comment";

export const CommentSort = () => {
  const [bottom, setBottom] = useState(true);
  const [replyToComment, setReplyToComment] = useState(null);
  const [isReComment, setIsReComment] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await lookupComment();
      console.log(response);

      const commentData = response.result || [];
      setComments(commentData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCommentClick = async (inputValue) => {
    try {
      // 댓글 등록 api
      const response = await postComment(inputValue, null);
      console.log(response);

      // 댓글 등록 후 최신 데이터 다시 가져오기
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReCommentClick = async (inputValue) => {
    try {
      // 답글 등록 api
      // 저기서 1은 상위 댓글 Id인데 우선 저렇게 하드코딩
      const response = await postComment(inputValue, replyToComment);
      console.log(response);

      // 답글 등록 후 최신 데이터 다시 가져오기
      fetchData();
      setIsReComment(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyToComment(commentId);
    setIsReComment(true);
  };

  // 시간계산 함수

  const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference = now - createdDate;
    const secondsAgo = Math.floor(timeDifference / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (secondsAgo < 60) {
      return `${secondsAgo}초 전`;
    } else if (minutesAgo < 60) {
      return `${minutesAgo}분 전`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo}시간 전`;
    } else if (daysAgo < 30) {
      return `${daysAgo}일 전`;
    } else {
      const formatter = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return formatter.format(createdDate);
    }
  };

  return (
    <>
      {bottom && (
        <>
          <Bottom
            title="댓글"
            onClose={() => {
              setBottom(false);
              setReplyToComment(null);
              setIsReComment(false);
            }}
            component={
              <div className={styles.all}>
                {comments.map((comment) => (
                  <div key={comment.commentId}>
                    <CommentBody
                      onReplyClick={handleReplyClick}
                      name={comment.userNickname}
                      time={calculateTimeDifference(comment.createdAt)}
                      likecount={comment.commentLike}
                      content={comment.content}
                      userImg={comment.userImage ? comment.userImage : null}
                      isDeleted={comment.isDeleted}
                      commentId={comment.commentId}
                      // islikeComment = {comment.islikeComment}
                    />

                    {/* Additional details as needed */}

                    {comment.childrenComments &&
                      comment.childrenComments.length > 0 && (
                        <>
                          {comment.childrenComments.map((childComment) => (
                            <div key={childComment.commentId}>
                              <div className={styles.recommentbody}>
                                <div className={styles.userlay}>
                                  {childComment.userImg ? (
                                    <Image
                                      src={userImg}
                                      alt=""
                                      width={25}
                                      height={25}
                                    />
                                  ) : (
                                    <Image
                                      src={user}
                                      alt=""
                                      width={25}
                                      height={25}
                                    />
                                  )}
                                  <div className={styles.name}>
                                    {childComment.userNickname}
                                  </div>
                                  <div className={styles.when}>
                                    {calculateTimeDifference(
                                      childComment.createdAt
                                    )}
                                  </div>
                                  <div className={styles.line}>|</div>
                                  <Image
                                    src={likeimg}
                                    alt="좋아요"
                                    width={10}
                                    height={9}
                                  />
                                  <div className={styles.likecount}>
                                    {childComment.commentLike}
                                  </div>

                                  <div className={styles.recommentshared}>
                                    <Image
                                      src={likeimg}
                                      alt="좋아요"
                                      width={11}
                                      height={9}
                                    />

                                    <Image
                                      onClick={() =>
                                        deleteComment(childComment.commentId)
                                      }
                                      src={moreimg}
                                      alt="더보기"
                                      width={2}
                                      height={8}
                                    />
                                  </div>
                                </div>
                                {!childComment.isDeleted && (
                                  <>
                                    <div className={styles.recommentdata}>
                                      {childComment.content}
                                    </div>
                                  </>
                                )}

                                {childComment.isDeleted && (
                                  <div className={styles.deletedComment}>
                                    삭제된 댓글입니다
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                  </div>
                ))}

                {isReComment ? (
                  <ReCommentInput onButtonClick={handleReCommentClick} />
                ) : (
                  <CommentInput onButtonClick={handleCommentClick} />
                )}
              </div>
            }
          />
        </>
      )}
    </>
  );
};
