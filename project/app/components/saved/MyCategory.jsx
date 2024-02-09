"use client";
import { useState } from "react";
import Image from "next/image";
import star_gray from "@/app/public/image/star_gray.png";
import star_yellow from "@/app/public/image/star_yellow.png";
import styles from "../../modules/savedCss/mycategory.module.scss";
import Category from "./Category";

const daily = {
  results: [
    {
      id: "1",
      day: "3",
      header: "햄버거가 먹고 싶은데.....",
      text: "빅맥이랑 상하이버거 중에 뭘 먹을까요?",
      like: "13",
      comment: "35",
    },
    {
      id: "2",
      day: "6",
      header: "가위바위보 할 때 어떤 게 승률이 젤 높나요?",
      text: "내일 중요한 가위바위보 경기가 있습니다. 추천해주세요.",
      like: "24",
      comment: "11",
    },
    {
      id: "3",
      day: "7",
      header: "노래 추천해주세요 여러분들~",
      text: "그냥 댓글로 아무나 좀 남겨주세요~",
      like: "13",
      comment: "16",
    },
  ],
};
const funny = {
  results: [
    {
      id: "1",
      day: "7",
      header: "노래 추천해주세요 여러분들~",
      text: "그냥 댓글로 아무나 좀 남겨주세요~",
      like: "13",
      comment: "16",
    },
    {
      id: "2",
      day: "6",
      header: "가위바위보 할 때 어떤 게 승률이 젤 높나요?",
      text: "내일 중요한 가위바위보 경기가 있습니다. 추천해주세요.",
      like: "24",
      comment: "11",
    },
  ],
};
const vote = {
  results: [
    {
      id: "1",
      day: "3",
      header: "햄버거가 먹고 싶은데.....",
      text: "빅맥이랑 상하이버거 중에 뭘 먹을까요?",
      like: "13",
      comment: "35",
    },
  ],
};
export default function MyCategory() {
  const [dailyClicked, setDailyClicked] = useState(false);
  const [funnyClicked, setFunnyClicked] = useState(false);
  const [voteClicked, setVoteClicked] = useState(false);

  return (
    <>
      <div
        className={styles.list}
        style={{ backgroundColor: dailyClicked ? "#FFF9BF" : "#F4F4F4" }}
      >
        <Image
          src={dailyClicked ? star_yellow : star_gray}
          alt="star"
          onClick={() => setDailyClicked(!dailyClicked)}
          style={{
            marginBottom: "80%",
            marginLeft: "83%",
          }}
        />
        <Category content={daily} name="일상" />
      </div>
      <div
        className={styles.list}
        style={{
          marginLeft: "52%",
          backgroundColor: funnyClicked ? "#FFF9BF" : "#F4F4F4",
        }}
      >
        <Image
          src={funnyClicked ? star_yellow : star_gray}
          alt="star"
          onClick={() => setFunnyClicked(!funnyClicked)}
          style={{
            marginBottom: "80%",
            marginLeft: "83%",
          }}
        />
        <Category content={funny} name="재밌는 거" />
      </div>
      <div
        className={styles.list}
        style={{
          marginTop: "60%",
          backgroundColor: voteClicked ? "#FFF9BF" : "#F4F4F4",
        }}
      >
        <Image
          src={voteClicked ? star_yellow : star_gray}
          alt="star"
          onClick={() => setVoteClicked(!voteClicked)}
          style={{
            marginBottom: "80%",
            marginLeft: "83%",
          }}
        />
        <Category content={vote} name="투표" />
      </div>
    </>
  );
}
