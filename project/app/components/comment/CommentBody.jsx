import styles from "@/app/modules/commentCss/commentBody.module.scss";
import likeimg from "@/app/public/image/like.png";
import recommentimg from "@/app/public/image/recomment.png";
import moreimg from "@/app/public/image/morebtncomment.png";
import user from "@/app/public/image/userimg.png";
import Image from "next/image";
import { deleteComment } from "@/app/api/api/comment";
import { likeComment } from "@/app/api/api/like";
import { deleteCommentLike } from "@/app/api/api/like";
import unlike from "@/app/public/image/unlike.png";
import { lookupComment } from "@/app/api/api/comment";
import { choiceComment } from "@/app/api/api/choice";
import trash from "@/app/public/image/cotrash.png";
import checkmate from "@/app/public/image/checkmate.png";
import selectCheck from "@/app/public/image/selectCheck.png";
import Toast from "../toast/Toast";
import { useState } from "react";

const CommentBody = ({
  onReplyClick,
  name,
  time,
  likecount,
  content,
  userImg,
  isDeleted,
  commentId,
  isPushedLike,
  isMyComment,
  isOwnerOfPost,
  postId,
  isSelected,
  onDDDClick,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const handleDeleteLike = async (commentId) => {
    try {
      const response = await deleteCommentLike(commentId, postId);
      console.log(response);

      onDDDClick();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (commentid) => {
    console.log(postId.postId);
    try {
      const response = await deleteComment(commentid, postId);
      console.log(response);
      onDDDClick();
      setToastMessage("댓글이 삭제되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await likeComment(commentId, postId);
      console.log(response);

      // 댓글 등록 후 최신 데이터 다시 가져오기
      onDDDClick();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoice = async (commentId) => {
    try {
      const response = await choiceComment(commentId, postId);
      console.log(response);
      onDDDClick();
    } catch (error) {
      console.log(error);
      if (error.response.data.code == "COMMENT4003") {
        setToastMessage("댓글 채택은 1개 댓글에 대해서만 가능합니다.");
        setShowToast(true);
      }
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className={styles.commentbody}>
      <div className={styles.userlay}>
        {userImg ? (
          <Image src={userImg} alt="" width={25} height={25} />
        ) : (
          <Image src={user} alt="" width={25} height={25} />
        )}

        <div className={styles.name}>{name}</div>
        <div className={styles.when}>{time}</div>
        <div className={styles.line}>|</div>
        <Image src={likeimg} alt="좋아요" width={10} height={9} />
        <div className={styles.likecount}>{likecount}</div>
        <div className={styles.select}>
          {isSelected ? (
            <div className={styles.choose}>
              <Image src={selectCheck} alt="채택" width={15} height={17} />
              <div className={styles.chooseText}>채택된 댓글</div>
            </div>
          ) : null}
        </div>
        <div className={styles.shared}>
          {/* 서버에서 내가 댓글에 좋아요를 눌렀는지 안눌렀는지에 대한 정보를 주면 boolean으로 판별하여서
          만약 좋아요를 눌렀으면 likeimg라고 뜨게하고 이걸 눌렀을때 좋아요가 취소되게함
          만약 좋아요를 안눌렀으면 unlick이미지를 뜨게하고 이걸 누르면 좋아요가 달리게함 
          대댓글도 이러한 방식으로 구현*/}

          {isPushedLike ? (
            <Image
              onClick={() => handleDeleteLike(commentId)}
              src={likeimg}
              alt="좋아요"
              width={11}
              height={9}
            />
          ) : (
            //<div onClick={() => handleDeleteLike(commentId)}>o</div>
            <Image
              onClick={() => handleLike(commentId)}
              src={unlike}
              alt="좋아요"
              width={11}
              height={9}
            />
            //<div onClick={() => handleLike(commentId)}>x</div>
          )}

          <Image
            onClick={() => onReplyClick(commentId)}
            src={recommentimg}
            alt="댓글"
            width={9}
            height={9}
          />

          {isMyComment && (
            <Image
              onClick={() => handleDelete(commentId)}
              src={trash}
              alt="삭제버튼"
              width={8}
              height={14}
            />
          )}
          {isOwnerOfPost && (
            <Image
              onClick={() => handleChoice(commentId)}
              src={checkmate}
              alt="채택버튼"
              width={10}
              height={10}
            />
          )}
        </div>
      </div>

      {!isDeleted && (
        <>
          <div className={styles.commentdata}>{content}</div>
        </>
      )}

      {isDeleted && (
        <div className={styles.deletedComment}>삭제된 댓글입니다</div>
      )}
      {showToast && <Toast message={toastMessage} onClose={handleToastClose} />}
    </div>
  );
};

export default CommentBody;
