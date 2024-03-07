"use client";
import React, { useState, useRef, useMemo } from "react";
import styles from "@/app/modules/voteDetailCss/gaugeVoteBox.module.scss";
import gaugeImg from "@/app/public/image/gauge_img.png";
import Image from "next/image";
import voteDetailStore from "@/app/zustand/voteDetailStore";
import useSelectVoteStore from "@/app/zustand/selectVote";
import total from "@/app/public/image/total.png";

const GaugeVoteBox = ({
  userimg,
  nickname,
  title,
  content,
  like,
  comment,
  pollTitle,
  postId,
  myPost,
}) => {
  const { totalGauge, userGauge, isVoted, onGoing, } = voteDetailStore();
  //gaugeValue = userGauge === null ? 0 : userGauge;
  //const gaugePercentage = gaugeValue + "%";

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
        0,
        Math.min(newPositionX / barWidth, 1.0)
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
  let GaugeValue;
  let usergaugeValue;
  if (userGauge === null) {
    GaugeValue = totalGauge;
  } else if (myPost) {
    usergaugeValue = totalGauge;
    GaugeValue = totalGauge;
  } else {
    usergaugeValue = userGauge;
    GaugeValue = totalGauge;
  }

  const gaugeValuePercent = GaugeValue + "%";
  const usergaugeValuePercent = usergaugeValue + "%";
  // linear-gradient로 배경색을 설정
  const gradientStyle = {
    background: `linear-gradient(to right, black ${(myPost || !isVoted) ? gaugeValuePercent : usergaugeValuePercent}, #eeeeee ${(myPost || !isVoted) ? gaugeValuePercent : usergaugeValuePercent})`,
    marginTop: "5px",
  };

  // total 이미지의 스타일 설정
  const totalImageStyle = {
    position: "absolute",
    left: gaugeValuePercent, // gaugeValuePercent에 따라 이미지 위치 설정
    marginBottom: "8px",
    transform: "translateX(-50%)", // 이미지 중앙 정렬을 위해 필요한 스타일
    // zIndex: 0,
    opacity: (myPost || !isVoted) ? "0.1" : "1.0"
  };

  // '평균값' 글씨의 스타일 설정
  const averageTextStyle = {
    position: "absolute",
    left: gaugeValuePercent, // gaugeValuePercent에 따라 이미지 위치 설정
    top: "25px",
    transform: "translateX(-50%)", // 글씨를 가운데 정렬하기 위한 스타일
  };

  // '게이지 이미지' 스타일 설정
  const gaugeImageStyle = {
    position: "absolute",
    left: (myPost || !isVoted) ? gaugeValuePercent : usergaugeValuePercent,
    bottom: "0",
    transform: "translateX(-50%)", // 이미지 중앙 정렬을 위해 필요한 스타일
    // zIndex: 1,
  };

  // gaugePercentage에서 왼쪽으로 25px만큼 이동한 크기 계산
  const leftMargin = `calc(${usergaugeValuePercent} - 25px)`;
  const leftUserMargin = `calc(${gaugeValuePercent} - 25px)`;

  // gaugePercentage에 따라 gaugeImageContainer의 left 값 조정
  const userGaugeStyle = {
    left: leftUserMargin,
  };

  // total 이미지와 '평균값'을 보여줄지 여부 결정
  const showAverageInfo = !(isVoted === false && onGoing === true);

  return (
    <>
      {(myPost || isVoted || !onGoing) ? (
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
              {/* 조건부 렌더링 */}
              {showAverageInfo && (
                <>
                  <Image src={total} alt="이미지" width={15} height={15} style={totalImageStyle} />
                  <div style={{ ...averageTextStyle, display: showAverageInfo ? "block" : "none" }}>평균값</div>
                </>
              )}
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
          {(onGoing || !isVoted) && <p>스와이프 해 투표해주세요!</p>}
        </div>
      )}
    </>
  );
};

export default GaugeVoteBox;
