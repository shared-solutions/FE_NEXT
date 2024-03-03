import Image from "next/image";
import defaultUserImg from "@/app/public/image/userimg.png";
import like from "../../public/image/like.png";
import comment from "../../public/image/comment.png";
import styles from "../../modules/reviewdetailCss/parentpost.module.scss";
import gaugeImg from "@/app/public/image/gauge_img.png";
import GeneralVoteBox from "@/app/components/postlist/GeneralVoteBox";
import CardVoteBox from "@/app/components/postlist/CardVoteBox";
import GaugeVoteBox from "@/app/components/postlist/GaugeVoteBox";
import voteDetailStore from "@/app/zustand/voteDetailStore";

export default function ParentPost({ postData, pollOption }) {
  const {
    allCandidatePercent,
    topCandidatePercent,
    topCandidate,
    topVoteResult,
    userVote,
    userVotePercent,
    userVoteResult,
    isVoted,
    onGoing,
    totalGuage,
    userGauge,
  } = voteDetailStore(); // 투표글 데이터 가져오기

  return (
    <div className={styles.post}>
      <div className={styles.profileContainer}>
        <Image
          src={postData.userImg === null ? defaultUserImg : postData.userImg}
          alt="userImg"
          width={22}
          height={22}
          style={{borderRadius: "50%"}}
        />
        <p>{postData.nickname}</p>
      </div>
      <h1>{postData.title}</h1>
      <p className={styles.content}>{postData.content}</p>

      <div className={styles.imgSlide}>
        {postData.postVoteType === "GENERAL" ? (
          <GeneralVoteBox
            postId={postData.postId}
            allCandidatePercent={allCandidatePercent}
            topCandidate={topCandidate}
            topCandidatePercent={topCandidatePercent}
            topVoteResult={topVoteResult}
            userVote={userVote}
            userVotePercent={userVotePercent}
            userVoteResult={userVoteResult}
            pollOption={pollOption}
            isVoted={isVoted}
            onGoing={onGoing}
          />
        ) : postData.postVoteType === "CARD" ? (
          <CardVoteBox
            postId={postData.postId}
            allCandidatePercent={allCandidatePercent}
            topCandidate={topCandidate}
            topCandidatePercent={topCandidatePercent}
            topVoteResult={topVoteResult}
            userVote={userVote}
            userVotePercent={userVotePercent}
            userVoteResult={userVoteResult}
            pollOption={pollOption}
            isVoted={isVoted}
            onGoing={onGoing}
          />
        ) : postData.postVoteType === "GAUGE" ? (
          <GaugeVoteBox />
        ) : null}
      </div>

      <div className={styles.imgContainer}>
        <Image src={like} alt="like" width={14} height={14} />
        <p style={{ color: "#F9C81C" }}>{postData.like}</p>
        <Image src={comment} alt="comment" width={14} height={14} />
        <p>{postData.comment}</p>
      </div>
    </div>
  );
}
