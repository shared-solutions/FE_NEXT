import styles from "@/app/modules/editCss/editinfo.module.scss";

export default function EditSecurityEmail({ onChange }) {
  return (
    <input
      type="text"
      placeholder="닉네임 입력"
      className={styles.input_nickname}
      onChange={onChange}
    />
  );
}
