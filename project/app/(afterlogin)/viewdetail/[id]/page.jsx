import Detail from "@/app/components/viewdetail/Detail";
import styles from "@/app/modules/viewdetailCss/viewdetail.module.scss";
import { detailData } from "@/app/DATA/dummyData";

export default async function Viewdetail() {
  return (
    <div className={styles.lay}>
      {detailData.map((detail, index) => (
        <Detail
          key={index}
          userimg={detail.userimg}
          username={detail.username}
          date={detail.date}
          time={detail.time}
          title={detail.title}
          content={detail.content}
          minititle={detail.minititle}
          point={detail.point}
          lefttime={detail.lefttime}
          selectImgList={detail.selectImgList}
          viewCount={detail.viewCount}
          likeCount={detail.likeCount}
          commentCount={detail.commentCount}
        />
      ))}
    </div>
  );
}
