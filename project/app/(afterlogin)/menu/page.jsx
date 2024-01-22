"use client";
import styles from "@/app/modules/menuCss/menu.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileImage from "@/app/components/ProfileImage/ProfileImage";
import Info from "@/app/components/menu/Info";
import Category from "@/app/components/menu/Category";
import Features from "@/app/components/menu/Features";
import Close from "@/app/components/menu/Close";

export default function MyPage() {
  const router = useRouter();
  const data = useSession;
  const Logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };
  const openModal = true;
  return (
    <>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.background}>
            <Close />
            <div className={styles.container}>
              <ProfileImage />
              <Info />
              <Category />
              <Features logout={Logout} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
