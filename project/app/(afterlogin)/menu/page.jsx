"use client";
import styles from "@/app/modules/menu.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import close from "../../public/image/close.ico";
import default_image from "../../public/image/default_image.png";
import edit from "../../public/image/edit.png";
import profile from "../../public/image/profile.png";
import qna from "../../public/image/qna.png";
import save from "../../public/image/save.png";
import arrow from "../../public/image/arrow.png";
import Link from "next/link";

export default function MyPage() {
  const router = useRouter();
  const data = useSession;
  const Logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };
  return (
    <div className={styles.background}>
      <div className={styles.close}>
        <p>닫기</p>
        <Link href="/home">
          <Image
            src={close}
            alt="close"
            width={40}
            height={40}
            padding={8}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src={default_image}
            alt="default image"
            className={styles.imageShadow}
            width={120}
            height={120}
          />
          <Image
            src={edit}
            alt="edit"
            className={styles.edit}
            width={60}
            height={60}
          />
        </div>
        <div className={styles.info}>
          <p className={styles.name}>psward73님</p>
          <div className={styles.rank}>Lv.1 박사</div>
        </div>
        <div className={styles.rowContainer}>
          <div className={styles.colContainer}>
            <p className={styles.boldText}>보유 포인트</p>
            <p className={styles.text}>2,554pt</p>
          </div>
          <div className={styles.colContainer}>
            <p className={styles.boldText}>추천 수</p>
            <p className={styles.text}>847개</p>
          </div>
        </div>
        <div className={`${styles.rowContainer} ${styles.withBorderTop}`}>
          <div className={styles.colContainer}>
            <Image src={qna} alt="qna" width={30} height={30} />
            <p className={styles.text}>나의 Q&A</p>
          </div>
          <div className={styles.colContainer} style={{ cursor: "pointer" }}>
            <Link href="/profile">
              <Image
                src={profile}
                alt="profile"
                width={33}
                height={33}
                style={{ "margin-left": "0.5rem" }}
              />
              <p className={styles.text}>프로필</p>
            </Link>
          </div>
          <div className={styles.colContainer}>
            <Image src={save} alt="save" width={20} height={25} />
            <p className={styles.text}>저장한 게시물</p>
          </div>
        </div>
        <div className={styles.grid}>
          <p>설정</p>
          <Image src={arrow} alt="arrow" width={13} height={13} />
        </div>
        <div className={styles.grid}>
          <p>문의하기</p>
          <Image src={arrow} alt="arrow" width={13} height={13} />
        </div>
        <div className={styles.grid}>
          <p onClick={Logout}>로그아웃</p>
          <Image src={arrow} alt="arrow" width={13} height={13} />
        </div>
      </div>
    </div>
  );
}
