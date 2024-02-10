import Detail from "@/app/components/viewdetail/Detail";
import styles from "@/app/modules/viewdetailCss/viewdetail.module.scss";

export default async function Viewdetail() {
  return (
    <div className={styles.lay}>
      <Detail />
    </div>
  );
}
