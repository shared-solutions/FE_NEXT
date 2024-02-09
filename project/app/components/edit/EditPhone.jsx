import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditPhone({ onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input type="tel" placeholder="휴대폰 번호 입력" />
        <button onChange={onChange}>인증</button>
      </div>
      <div className={styles.input_container}>
        <input type="number" placeholder="인증번호 입력" />
        <button>인증 확인</button>
      </div>
    </div>
  );
}
