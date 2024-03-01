"use client";
import React, { useState, useRef, useMemo } from "react";
import styles from "@/app/modules/voteDetailCss/gaugeVoteBox.module.scss";
import gaugeImg from "@/app/public/image/gauge_img.png";
import Image from "next/image";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";

const GaugeVoteBox = ({
  userimg,
  nickname,
  title,
  content,
  like,
  comment,
  pollTitle,
  postId,
}) => {
  const { totalGuage, userGauge, isVoted } = voteDetailStore();
  const gaugeValue = userGauge === null ? 0 : userGauge;
  const gaugePercentage = gaugeValue + "%";

  // 게이지 투표 하기
  const { position, updatePosition } = useSelectVoteStore();
  const [dragging, setDragging] = useState(false);
  const [positionX, setPositionX] = useState(0.1);
  const barRef = useRef(null);

  const handleTouchStart = (event) => {
    setDragging(true);
    handleTouchMove(event);
  };

  const handleTouchEnd = () => {
    console.log("포지션", position);
    setDragging(false);
  };

  const handleTouchMove = (event) => {
    if (dragging) {
      const newPositionX = event.touches[0].clientX;
      const barWidth = barRef.current.offsetWidth;
      const newPositionWithinBar = Math.max(
        0.05,
        Math.min(newPositionX / barWidth, 0.95)
      );
      setPositionX(newPositionWithinBar);
      // 정수로 변환하여 업데이트
      updatePosition(Math.round(newPositionWithinBar * 100));
    }
  };

  const getBarColor = useMemo(() => {
    return positionX <= 1 ? "#000000" : "#D9D9D9";
  }, [positionX]);

  // 투표 결과 나타내기
  // linear-gradient로 배경색을 설정
  const gradientStyle = {
    background: `linear-gradient(to right, black ${gaugePercentage}, #eeeeee ${gaugePercentage})`,
  };

  // gaugePercentage에서 왼쪽으로 25px만큼 이동한 크기 계산
  const leftMargin = `calc(${gaugePercentage} - 25px)`;

  // gaugePercentage에 따라 gaugeImageContainer의 left 값 조정
  const gaugeImageStyle = {
    left: leftMargin,
  };

  return (
    <>
      {isVoted ? (
        <div className={styles.wrap}>
          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeImageContainer} style={gaugeImageStyle}>
              <Image
                src={gaugeImg}
                alt="게이지 이미지"
                width={50}
                height={50}
              />
            </div>
            <div className={styles.pollTitleContainer} style={gradientStyle}>
              {/* <div className={styles.pollTitle}>{pollTitle}</div> */}
              {/* 퍼센티지 하드코딩 수정해야 함 */}
              <div className={styles.pollTitlePercentage}>{gaugeValue}%</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.box}>
          <div className={styles.gauge_wrap}>
            <div
              ref={barRef}
              className={styles.bar}
              style={{
                width: "100%",
                height: "18px",
                background: `linear-gradient(to right, ${getBarColor} ${
                  positionX * 100
                }%, #A1A1A1 ${positionX * 100}%, #A1A1A1 100%)`,
                borderRadius: "10px",
                position: "relative",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={gaugeImg}
                alt="Gauge Image/"
                className={styles.gauge_image}
                style={{ left: `${positionX * 100}%` }}
              />
            </div>
          </div>
          <p>스와이프 해 투표해주세요!</p>
        </div>
      )}
    </>
  );
};

export default GaugeVoteBox;
