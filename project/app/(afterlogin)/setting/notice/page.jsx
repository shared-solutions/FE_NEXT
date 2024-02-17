import styles from "@/app/modules/settingCss/notice.module.scss";
import Header from "@/app/components/setting/Header";
import Image from "next/image";
import logo_image from "@/app/public/image/logo_image.png";

export default function notice() {
  return (
    <div className={styles.container}>
      <Header text="공지사항" />
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <Image src={logo_image} alt="image" />
          <div className={styles.content_text}>
            <p style={{ fontWeight: "bold" }}>커뮤니티 처리방침 개정 안내</p>
            <div className={styles.text_container}>
              <p style={{ color: "#595959" }}>
                안녕하세요 고민친구 여러분! 고민친구는 누구..
              </p>
              <p style={{ color: "#A5A5A5" }}>3일전</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Image src={logo_image} alt="image" />
          <div className={styles.content_text}>
            <p style={{ fontWeight: "bold" }}>커뮤니티 처리방침 개정 안내</p>
            <div className={styles.text_container}>
              <p style={{ color: "#595959" }}>
                안녕하세요 고민친구 여러분! 고민친구는 누구..
              </p>
              <p style={{ color: "#A5A5A5" }}>3일전</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Image src={logo_image} alt="image" />
          <div className={styles.content_text}>
            <p style={{ fontWeight: "bold" }}>커뮤니티 처리방침 개정 안내</p>
            <div className={styles.text_container}>
              <p style={{ color: "#595959" }}>
                안녕하세요 고민친구 여러분! 고민친구는 누구..
              </p>
              <p style={{ color: "#A5A5A5" }}>3일전</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
