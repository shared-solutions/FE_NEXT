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
import trash from "@/app/public/image/cotrash.png";
import unlike from "@/app/public/image/unlike.png";
import { deleteCommentLike } from "@/app/api/api/like";
import { likeComment } from "@/app/api/api/like";
import Toast from "../toast/Toast";

export const calculateTimeDifference = (createdAt) => {
  if (!createdAt) {
    return '작성 시간을 찾을 수 없습니다'; 
  }
  console.log("createdAt:", createdAt);
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
export const CommentSort = (postId) => {
  const [bottom, setBottom] = useState(true);
  const [replyToComment, setReplyToComment] = useState(null);
  const [isReComment, setIsReComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await lookupComment(postId);
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
    console.log(postId.postId);
    try {
      // 댓글 등록 api
      const response = await postComment(inputValue, null, postId.postId);
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
      const response = await postComment(
        inputValue,
        replyToComment,
        postId.postId
      );
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

  const handleDelete = async (commentid) => {
    console.log(postId.postId);
    try {
      const response = await deleteComment(commentid, postId.postId);
      console.log(response);

      fetchData();
      setToastMessage("댓글이 삭제되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLike = async (commentId) => {
    try {
      const response = await deleteCommentLike(commentId, postId.postId);
      console.log(response);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await likeComment(commentId, postId.postId);
      console.log(response);

      // 댓글 등록 후 최신 데이터 다시 가져오기
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleToastClose = () => {
    setShowToast(false);
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
                      isPushedLike={comment.isPushedLike}
                      isMyComment={comment.isMyComment}
                      isOwnerOfPost={comment.isOwnerOfPost}
                      isSelected={comment.isSelected}
                      postId={postId.postId}
                      onDDDClick={fetchData}
                    />

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
                                  <div className={styles.whenc}>
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
                                    {childComment.isPushedLike ? (
                                      <Image
                                        onClick={() =>
                                          handleDeleteLike(
                                            childComment.commentId
                                          )
                                        }
                                        src={likeimg}
                                        alt="좋아요"
                                        width={11}
                                        height={9}
                                      />
                                    ) : (
                                      <Image
                                        onClick={() =>
                                          handleLike(childComment.commentId)
                                        }
                                        src={unlike}
                                        alt="좋아요취소"
                                        width={11}
                                        height={9}
                                      />
                                    )}

                                    {childComment.isMyComment && (
                                      <Image
                                        onClick={() => {
                                          handleDelete(childComment.commentId);
                                        }}
                                        src={trash}
                                        alt="더보기"
                                        width={8}
                                        height={14}
                                      />
                                    )}
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
                    {showToast && (
                      <Toast
                        message={toastMessage}
                        onClose={handleToastClose}
                      />
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
