import Image from "next/image";
import styles from "../../modules/profileCss/rank.module.scss";
import ProgressBar from "./ProgressBar";
import question from "../../public/image/question.png";


export default function Rank({ data, clickHandler }) {
  const testData = [{ completed: 0 }];
  const recommendationCount = data.recommend; // Replace this with the actual recommendation count
  let count;
  switch (true) {
    case recommendationCount >= 5001:
      count = recommendationCount;
      break;
    case recommendationCount >= 3001:
      count = 2000;
      break;
    case recommendationCount >= 1501:
      count = 1500;
      break;
    case recommendationCount >= 1001:
      count = 500;
      break;
    case recommendationCount >= 501:
      count = 500;
      break;
    case recommendationCount >= 301:
      count = 200;
      break;
    case recommendationCount >= 101:
      count = 200;
      break;
    case recommendationCount >= 31:
      count = 70;
      break;
    case recommendationCount >= 11:
      count = 20;
      break;
    case recommendationCount >= 1:
      count = 10;
      break;
    default:
      count = 1;
  }
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
        <p className={styles.font}>{data.recommend / count * 100}개</p>
      </div>
      {testData.map((item, idx) => (
        <ProgressBar
          key={idx}
          bgcolor="#FFC700"
          completed={5+item.completed}
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
