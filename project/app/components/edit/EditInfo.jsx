import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditInfo({
  veri_type,
  verification,
  text,
  type,
  onChange,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input type={veri_type} placeholder={verification + "입력"} />
        <button>인증</button>
      </div>
      <div className={styles.input_container}>
        <input type="number" placeholder="인증번호 입력" />
        <button>인증 확인</button>
      </div>
      <div className={styles.input_container}>
        <input
          type={type}
          placeholder={"변경하고자 하는 " + text + "을 입력해주세요"}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
