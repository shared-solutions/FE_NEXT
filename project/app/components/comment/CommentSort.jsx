import { Bottom } from "./Bottom";
import { useState } from "react";
import CommentBody from "./CommentBody";
import RecommentBody from "./RecommentBody";
import CommentInput from "../input/CommentInput";
import { ReCommentInput } from "../input/CommentInput";
import { postComment } from "@/app/api/api/comment";

export const CommentSort = () => {
  const [bottom, setBottom] = useState(true);
  const [replyToComment, setReplyToComment] = useState(null);
  const [isReComment, setIsReComment] = useState(false);

  const handleCommentClick = (inputValue) => {
    console.log("댓글 등록", inputValue);
    // 댓글 등록 api
    const response = postComment(inputValue, null);
    console.log(response);
  };

  const handleReCommentClick = (inputValue) => {
    console.log("답글 등록", inputValue);
    // 답글 등록 api
    // 저기서 1은 상위 댓글 Id인데 우선 저렇게 하드코딩
    const response = postComment(inputValue, 1);
    console.log(response);
    setIsReComment(false);
  };

  const handleReplyClick = (commentId) => {
    setReplyToComment(commentId);
    setIsReComment(true);
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
              <>
                <CommentBody onReplyClick={handleReplyClick} />
                <RecommentBody onReplyClick={handleReplyClick} />
                {isReComment ? (
                  <ReCommentInput onButtonClick={handleReCommentClick} />
                ) : (
                  <CommentInput onButtonClick={handleCommentClick} />
                )}
              </>
            }
          />
        </>
      )}
    </>
  );
};
