import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditSecuritypw({ onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input type="password" placeholder="현재 비밀번호 입력" />
        <button>인증</button>
      </div>
      <div className={styles.input_container}>
        <input
          type="password"
          placeholder="변경할 비밀번호 입력"
          onChange={onChange}
        />
      </div>
      <div className={styles.input_container}>
        <input type="password" placeholder="변경할 비밀번호 확인" />
      </div>
    </div>
  );
}
