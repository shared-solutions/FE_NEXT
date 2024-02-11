import Image from "next/image";
import styles from "../../modules/profileCss/rank.module.scss";
import ProgressBar from "./ProgressBar";
import question from "../../public/image/question.png";

const testData = [{ bgcolor: "#FFC700", completed: 80 }];

export default function Rank({ data, clickHandler }) {
  return (
    <>
      <div className={styles.rowContainer}>
        <h1>내 등급</h1>
        <Image
          src={question}
          alt="question"
          width={18}
          height={18}
          style={{ marginLeft: "0.4rem" }}
          onClick={clickHandler}
        />
      </div>
      <div className={`${styles.rowContainer2} ${styles.alignRight}`}>
        <p className={styles.title1}>추천 수 : </p>
        <p className={styles.font}>{data.recommend}개</p>
      </div>
      {testData.map((item, idx) => (
        <ProgressBar
          key={idx}
          bgcolor={item.bgcolor}
          completed={item.completed}
        />
      ))}
      <div className={styles.container}>
        <p className={styles.text}>
          Lv.{data.nextGrade + 1} {data.grade}
        </p>
        <div className={`${styles.rowContainer2} ${styles.alignRight}`}>
          <p className={styles.title2}>다음등급 : </p>
          <p className={styles.font}>{data.nextGradeName}</p>
        </div>
      </div>
    </>
  );
}
