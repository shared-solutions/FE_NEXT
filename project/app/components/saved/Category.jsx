import styles from "../../modules/savedCss/mycategory.module.scss";
import Image from "next/image";
import like from "@/app/public/image/like.png";
import comment from "@/app/public/image/comment.png";

export default function Category({ posts, name }) {
  const len = posts.length;
  const slicedPostList = posts.slice(0, 3); 

  return (
    <>
      {len === 0 ? (
        <p className={styles.none}>아직 저장한 게시물이 없습니다.</p>
      ) : (
        slicedPostList.map((post, index) => {
          let topValue, leftValue;
          if (len >= 3) {
            topValue = `${3 - index * 1.2}rem`;
            leftValue = `${3 - index * 1}rem`;
          } else if (len === 2) {
            topValue = `${3 - index * 2}rem`;
            leftValue = `${3 - index * 2}rem`;
          } else if (len === 1) {
            topValue = `2rem`;
            leftValue = `2rem`;
          }
          return (
            <div
              className={styles.post}
              key={post.title}
              style={{
                top: topValue,
                left: leftValue,
                zIndex: 3 - index + 1,
              }}
            >
              <div className={styles.rightContainer}>
                <p>{post.ago}일전</p>
              </div>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <div className={styles.imgContainer}>
                <Image src={like} alt="like" width={9} height={9} />
                <p style={{ color: "#F9C81C" }}>{post.postLike}</p>
                <Image src={comment} alt="comment" width={9} height={9} />
                <p>{post.comment}</p>
              </div>
            </div>
          );
        })
      )}
      <p className={styles.name}>{name}</p>
    </>
  );
}
