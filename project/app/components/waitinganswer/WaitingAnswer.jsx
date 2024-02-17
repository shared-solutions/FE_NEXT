import styles from "@/app/modules/waitCss/wait.module.scss";
import waitimg from "@/app/public/image/waitimg.png";
import vectorimg from "@/app/public/image/Vector.png";
import Image from "next/image";
import { PageRendering } from "@/app/zustand/store";
import { getRecent } from "@/app/api/api/home";
import { useState } from "react";
import GaugeP from "../postlist/GaugeP";
import CardP from "../postlist/CardP";
import GeneralP from "../postlist/GeneralP";
import { useEffect } from "react";
import Link from "next/link";
import defaultUserImg from "@/app/public/image/userimg.png";

const WaitingAnswer = () => {
  const changePage = PageRendering((state) => state.changePageWait);

  const [userData, setUserData] = useState([]);

  const getData = async () => {
    try {
      const response = await getRecent();

      setUserData(response.result.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const renderPostBox = (userDataItem, index) => {
    const {
      post_id,
      postVoteType,
      user,
      title,
      content,
      like,
      gauge,
      candidateList,
      comment_cnt,
      file,
      created_at,
    } = userDataItem;

    const generalProps = {
      userimg: user.image || defaultUserImg,
      nickname: user.nickname || "",
      title: title || "",
      content: content || "",
      candidateList: candidateList || [],
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      file: file || [],
      date: created_at || 0,
    };

    const cardProps = {
      userimg: user.image || defaultUserImg,
      nickname: user.nickname || "",
      title: title || "",
      content: content || "",
      candidateList: candidateList || [],
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      file: file || [],
      date: created_at || 0,
    };

    const gaugeProps = {
      userimg: user.image || defaultUserImg,
      nickname: user.nickname || "",
      title: title || "",
      content: content || "",
      like: like || 0,
      comment_cnt: comment_cnt || 0,
      file: file || [],
      date: created_at || 0,
    };

    // const waitingProps = {
    //   userimg: user.image || defaultUserImg,
    //   nickname: user.nickname || "",
    //   title: title || "",
    //   content: content || "",
    //   like: like || 0,
    //   comment_cnt: comment_cnt || 0,
    //   time: created_at || "",
    // };

    return (
      <>
        <div key={index}>
          <Link
            className={styles.link}
            key={index}
            href={`/viewdetail/${post_id}`}
          >
            {postVoteType === "GENERAL" ? (
              <GeneralP {...generalProps} />
            ) : postVoteType === "CARD" ? (
              <CardP {...cardProps} />
            ) : postVoteType === "GAUGE" ? (
              <GaugeP {...gaugeProps} gauge={gauge || 0} />
            ) : null}
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.title}>
        답변을 기다리는 고민들
        <Image
          className={styles.waitimg}
          src={waitimg}
          alt="눈 이미지"
          width={23}
          height={23}
        />
        <button className={styles.morebtn} onClick={changePage}>
          더보기 <Image src={vectorimg} alt="벡터" width={5} height={10} />
        </button>
      </div>
      {/* <div className={styles.boxlay}></div> */}
      <div className={styles.cover}>{userData.map(renderPostBox)}</div>
    </>
  );
};

export default WaitingAnswer;
