import styles from "@/app/modules/postListCss/voteList.module.scss";
import AllPageBox from "@/app/components/hot/AllPageBox";
import PostCategory from "@/app/components/postlist/PostCategory";
const PostList = () => {
  return (
    <div className={styles.cover}>
      <PostCategory />
      <AllPageBox />
      <AllPageBox />
      <AllPageBox />
      <AllPageBox />
    </div>
  );
};

export default PostList;
