"use client";
import { useState } from "react";
import styles from "@/app/modules/searchCss/search.module.scss";
import Link from "next/link";
import Image from "next/image";
import close_round from "@/app/public/image/close_round.png";
import down_img from "@/app/public/image/down_img.png";
import up_img from "@/app/public/image/up_img.png";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [recentArray, setRecentArray] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addRecentArray();
    }
  };

  const addRecentArray = () => {
    if (inputValue.trim() !== "") {
      setRecentArray([...recentArray, inputValue]);
      setInputValue("");
    }
  };

  const removeRecentItem = (index) => {
    setRecentArray(recentArray.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.search}>
        <input
          className={styles.search_input}
          placeholder="검색어를 입력해주세요"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <Image
          src={close_round}
          className={styles.close}
          alt="image"
          width={15}
          height={15}
        />
        <Link href="/home" style={{textDecoration: "none"}}><p>취소</p></Link>
      </div>
      <div className={styles.text_container}>
        <p style={{ marginRight: "32%" }}>최근 검색어</p>
        <p>자동저장 끄기</p>
        <p>전체삭제</p>
      </div>
      <div className={styles.search_container}>
        {recentArray.map((recent, index) => (
          <div key={index} className={styles.category}>
            <p className={styles.text}>{recent}</p>
            <Image
              src={close_round}
              alt="image"
              width={15}
              height={15}
              style={{ marginLeft: "15px", cursor: "pointer" }}
              onClick={() => removeRecentItem(index)}
            />
          </div>
        ))}
      </div>
      <div className={styles.words}>
        <p className={styles.word}>인기 검색어</p>
        {!isOpened && (
          <div className={styles.number}>
            <div className={styles.num}>1</div> <p>국물 닭발</p>
          </div>
        )}
        <Image
          src={isOpened ? up_img : down_img}
          alt="toggles"
          className={styles.toggle}
          onClick={() => setIsOpened(!isOpened)}
        />
      </div>
      {isOpened && (
        <div className={styles.popular}>
          <div className={styles.number}>
            <div className={styles.num}>1</div> <p>국물 닭발</p>
          </div>
          <div className={styles.number}>
            <div className={styles.num}>2</div> <p>엽기떡볶이</p>
          </div>
          <div className={styles.number}>
            <div className={styles.num}>3</div> <p>BHC 핫후라이드</p>
          </div>
          <div className={styles.number}>
            <div className={styles.num}>4</div> <p>교촌치킨</p>
          </div>
          <div className={styles.number}>
            <div className={styles.num}>5</div> <p>육회비빔밥</p>
          </div>
        </div>
      )}
    </>
  );
}
