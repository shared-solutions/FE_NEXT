import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditInfo({ onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input
          type="tel"
          placeholder="휴대폰 번호 입력"
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        />
        <button>인증</button>
      </div>
      <div className={styles.input_container}>
        <input type="number" placeholder="인증번호 입력" />
        <button>인증 확인</button>
      </div>
      <div className={styles.input_container}>
        <input
          type="text"
          placeholder="변경하고자 하는 이름을 입력해주세요"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
