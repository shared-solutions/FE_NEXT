import styles from "@/app/modules/menuCss/menu.module.scss";

export default function Icon({ text, onClick }) {
  return (
    <div className={styles.grid} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}
