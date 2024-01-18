import styles from "@/app/modules/waitCss/waitbox.module.scss";

const WaitingBox = () => {
  return (
    <div className={styles.box}>
      <div className={styles.commentbox}>
        가족과의 의사소통이 어려워저서 걱정이에요. 가족과의 관계를 개선하고
        싶은데, 어떤 방법이 좋을까요?
      </div>
    </div>
  );
};

export default WaitingBox;
