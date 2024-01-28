"use client";
import styles from "@/app/modules/mypage.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//import Image from "next/image";
//import edit from "../../public/image/edit.png";
//import profile from "../../public/image/profile.png";
//import qna from "../../public/image/qna.png";
//import saved_post from "../../public/image/saved_post.png";
//import none from "../../public/image/none.png";

export default function MyPage() {
  const router = useRouter();
  const data = useSession;
  const Logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {!name && <p>맛있는바나나나</p>}
        <p>2550P</p>
        <p>Lv.1 박사</p>
        <p>추천수: 847</p>
      </div>
      <div className={styles.info}>
        <div className={styles.box}>
          <p>나의 Q&A</p>
        </div>
        <div className={styles.box}>
          <p>나의 프로필</p>
        </div>
        <div className={styles.box}>
          <p>저장한 게시물</p>
        </div>
      </div>
      <div className={styles.setting}>
        <p>설정</p>
        <p>문의하기</p>
        <p onClick={Logout}>로그아웃</p>
      </div>
    </div>
  );
}
