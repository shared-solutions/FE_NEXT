import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditInfo({ onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input type="email" placeholder="현 이메일 주소 입력" required />
        <button>인증</button>
      </div>
      <div className={styles.input_container}>
        <input type="number" placeholder="인증번호 입력" />
        <button>인증 확인</button>
      </div>
      <div className={styles.input_container}>
        <input
          type="email"
          placeholder="변경하고자 하는 메일을 입력해주세요"
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
