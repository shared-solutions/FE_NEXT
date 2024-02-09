import { Bottom } from "./Bottom";
import { useState } from "react";
import CommentBody from "./CommentBody";
import RecommentBody from "./RecommentBody";
import CommentInput from "../input/CommentInput";
export const CommentSort = () => {
  const [bottom, setBottom] = useState(true);

  const handleCommentClick = (inputValue) => {
    console.log("댓글 등록", inputValue);
    // 댓글등록 api
  };
  return (
    <>
      {bottom && (
        <>
          <Bottom
            title="댓글"
            onClose={() => setBottom(false)}
            component={
              <>
                <CommentBody />

                <CommentBody />
                <RecommentBody />
                <CommentBody />
                <RecommentBody />

                <CommentInput onButtonClick={handleCommentClick} />
              </>
            }
          />
        </>
      )}
    </>
  );
};
