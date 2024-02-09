import styles from "../../modules/savedCss/mycategory.module.scss";
import Image from "next/image";
import like from "@/app/public/image/like.png";
import comment from "@/app/public/image/comment.png";
export default function Category({ content, name }) {
  const displayedPosts = content.results.slice(0, 3).reverse();
  const len = displayedPosts.length;

  return (
    <>
      {displayedPosts.map((post, index) => {
        let topValue, leftValue;
        if (len === 3) {
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
            key={post.id}
            style={{
              top: topValue,
              left: leftValue,
              zIndex: 3 - index + 1,
            }}
          >
            <div className={styles.rightContainer}>
              <p>{post.day}일전</p>
            </div>
            <h1>{post.header}</h1>
            <p>{post.text}</p>
            <div className={styles.imgContainer}>
              <Image src={like} alt="like" width={9} height={9} />
              <p style={{ color: "#F9C81C" }}>{post.like}</p>
              <Image src={comment} alt="comment" width={9} height={9} />
              <p>{post.comment}</p>
            </div>
          </div>
        );
      })}
      <p className={styles.name}>{name}</p>
    </>
  );
}
