import styles from "@/app/modules/waitCss/writebutton.module.scss";
import Link from "next/link";
const HomeWriteButtonLay = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>지금, 고민을 해결하고 싶으신가요?</div>
      <div className={styles.info}>
        약 50만명의 고민친구들에게 이야기를 공유해보세요. 그들이 당신의 고민을
        해결해줄 지도 모릅니다!
      </div>
      <Link className={styles.link} href="/vote/write">
        <button className={styles.writebtn}>글 작성하기</button>
      </Link>
    </div>
  );
};

export default HomeWriteButtonLay;
