import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditSecurityEmail({
  currentMailHandeler,
  securityMailHandler,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input type="email" placeholder="현 이메일 주소" />
        <button onChange={currentMailHandeler}>인증</button>
      </div>
      <div className={styles.input_container}>
        <input type="number" placeholder="인증번호 입력" />
        <button>인증 확인</button>
      </div>
      <div className={styles.input_container}>
        <input type="email" placeholder="새로운 이메일 주소" />
        <button onChange={securityMailHandler}>인증</button>
      </div>
      <div className={styles.input_container}>
        <input type="number" placeholder="인증번호 입력" />
        <button>인증 확인</button>
      </div>
    </div>
  );
}
