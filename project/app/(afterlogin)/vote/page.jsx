import styles from "@/app/modules/postListCss/voteList.module.scss";
import AllPageBox from "@/app/components/hot/AllPageBox";
import PostCategory from "@/app/components/postlist/PostCategory";
import Link from "next/link";
import { voteData } from "@/app/DATA/dummyData";

const PostList = () => {
  return (
    <div className={styles.cover}>
      <PostCategory />
      {voteData.map((vote, index) => (
        <Link className={styles.link} href={`/viewdetail/${vote.reviewId}`}>
          <AllPageBox
            key={index}
            userimg={vote.userimg}
            nickname={vote.nickname}
            title={vote.title}
            content={vote.content}
            selectImgList={vote.selectImgList}
          />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
