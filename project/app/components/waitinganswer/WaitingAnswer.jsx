import styles from "@/app/modules/waitCss/wait.module.scss";
import WaitingBox from "./WaitingBox";

const WaitingAnswer = () => {
  return (
    <>
      <div className={styles.title}>답변을 기다리는 고민들</div>
      <div className={styles.boxlay}>
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
        <WaitingBox />
      </div>
    </>
  );
};

export default WaitingAnswer;
