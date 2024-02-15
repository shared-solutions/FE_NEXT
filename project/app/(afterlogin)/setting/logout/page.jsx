"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/modules/settingCss/logout.module.scss";
import Header from "@/app/components/setting/Header";

export default function Logout() {
  const router = useRouter();
  const data = useSession;
  const Logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/login");
    });
  };
  return (
    <div className={styles.container}>
      <Header text="로그아웃" />
      <h1 className={styles.text}>로그아웃 하시겠습니까?</h1>
      <button className={styles.button_logout} onClick={Logout}>
        로그아웃
      </button>
      <Link href="/home">
        <button className={styles.button_cancel}>취소</button>
      </Link>
    </div>
  );
}