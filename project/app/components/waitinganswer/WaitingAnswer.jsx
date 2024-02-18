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
import GeneralPostBox from "@/app/components/postlist/GeneralPostBox";
import CardPostBox from "@/app/components/postlist/CardPostBox";
import GaugePostBox from "@/app/components/postlist/GaugePostBox";
const WaitingAnswer = () => {
  const changePage = PageRendering((state) => state.changePageWait);

  const [userData, setUserData] = useState([]);

  const getData = async () => {
    try {
      const response = await getRecent();
      console.log(response);
      setUserData(response.result.pollPostList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const renderPostBox = (userDataItem, index) => {
    const {
      postId,
      postVoteType,
      user,
      title,
      content,
      like,
      gauge,
      candidateList,
      comment,
      file,
      created_at,
      userImg,
      nickname,
      pollOption,
      pollTitle,
      // ===== 0216 추가 시작 ====
      onGoing, // 마감 여부
      isVoted, // 사용자 투표 여부
      topCanditate, // 1등인 후보 리스트
      topCandidatePercent, // 1등 후보 퍼센트 리스트
      userVote, // 사용자가 투표한 후보 리스트,
      userVotePercent, // 사용자가 투표한 후보 퍼센트 리스트
      allCandidatePercent, // 모든 후보의 퍼센트 리스트
      userGauge, // 사용자가 투표한 항목의 퍼센트
      totalGauge, // 평균 게이지
      uploadDate,
      // ===== 0216 추가 끝 ====
    } = userDataItem;

    // 기본값 설정
    // const defaultPostProps = {
    //   userimg: user.image || defaultUserImg,
    //   nickname: user.nickname || "",
    //   title: title || "",
    //   content: content || "",
    //   pollOption: candidateList || [],
    //   like: like || 0,
    //   comment: comment_cnt || 0,
    // };

    const defaultPostProps = {
      userimg: userImg || defaultUserImg,
      nickname: nickname || "",
      title: title || "",
      content: content || "",
      pollOption: pollOption || [],
      like: like || 0,
      comment: comment || 0,

      // ===== 0216 추가 시작 ====
      onGoing: onGoing || true, // 기본값 : 마감 X
      isVoted: isVoted || false, // 기본값 : 사용자 투표 X
      topCanditate: topCanditate || [],
      userVote: userVote || [],
      userVotePercent: userVotePercent || [],
      topCandidatePercent: topCandidatePercent || [],
      allCandidatePercent: allCandidatePercent || [],
      userGauge: userGauge || 0,
      totalGauge: totalGauge || 0,
      date: uploadDate || 0,
      // ===== 0216 추가 끝 ====
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
      <div key={index}>
        <Link
          className={styles.link}
          key={index}
          href={`/viewdetail/${postId}`}
        >
          {postVoteType === "GENERAL" ? (
            <GeneralPostBox {...defaultPostProps} />
          ) : postVoteType === "CARD" ? (
            <CardPostBox {...defaultPostProps} />
          ) : postVoteType === "GAUGE" ? (
            <GaugePostBox
              {...defaultPostProps}
              pollTitle={pollTitle || ""}
              gauge={gauge || 0}
            />
          ) : null}
        </Link>
      </div>
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
