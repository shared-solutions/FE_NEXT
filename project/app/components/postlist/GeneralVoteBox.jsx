"use client";
import styles from "@/app/modules/voteDetailCss/generalVoteBox.module.scss";
import Image from "next/image";

import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";

import check from "@/app/public/image/generalCheck.png";

const GeneralVoteBox = ({ pollOption }) => {
    const {
        allCandidatePercent,
        userVote,
        isVoted,
        onGoing,
    } = voteDetailStore();


    const { selectList, updateSelectList } = useSelectVoteStore();

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <div className={styles.options}>
                {pollOption &&
                    pollOption.map((option, index) => (
                    <div
                        key={index}
                        className={`${styles.option} ${
                        selectList.includes(option.optionId)
                            ? styles.selectedOption
                            : ""
                        }`}
                        onClick={
                        !isVoted ? () => updateSelectList(option.optionId) : null
                        }
                    >
                        {option.optionImgUrl && (
                        <Image
                            src={option.optionImgUrl}
                            alt={`선택지 ${index + 1}`}
                            width={35}
                            height={35}
                        />
                        )}
                        <div className={styles.optionStringBox}>
                        {/* 투표 진행 중인데 사용자가 투표 안 했을 때만 보임*/}
                        {(onGoing && !isVoted) && (
                            <div className={styles.optionString}>
                            {option.optionString}
                            </div>
                        )}
                        
                        <div className={styles.optionResult}>
                        </div>

                        {(!onGoing || isVoted) && allCandidatePercent && (
                            // 추가: 투표 마감 후 & 사용자 투표 했을 때 결과 표시
                            <div
                            className={`${styles.allCandidate} ${
                                userVote?.[0]?.optionId === option.optionId
                                ? styles.userVote
                                : ""
                            }`}
                            style={{ width: `${allCandidatePercent[index]}%` }}
                            >
                                <div
                                    className={styles.optionString}
                                    style={{
                                    color:
                                        allCandidatePercent[index] === 0
                                        ? "black"
                                        : "white",
                                    }}
                                >
                                    {option.optionString}
                                </div>
                                {userVote &&
                                userVote
                                .map((vote) => vote.optionId)
                                .includes(option.optionId) && (
                                <Image
                                    src={check}
                                    alt="체크"
                                    width={15}
                                    height={15}
                                    className={styles.checkImage}
                                />
                                )}
                                <div className={styles.optionPercentage} style={{color: allCandidatePercent[index] === 100 ? "white" : "black" }}>
                                    {allCandidatePercent[index]}%
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeneralVoteBox;
