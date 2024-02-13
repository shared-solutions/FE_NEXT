"use client";
import { useState, useEffect } from "react";
import styles from "@/app/modules/menuCss/menu.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/api/user/login/login";
import { getMyPage } from "@/app/api/user/profile/my-profile";
import ProfileImage from "@/app/components/menu/ProfileImage";
import Info from "@/app/components/menu/Info";
import Category from "@/app/components/menu/Category";
import Features from "@/app/components/menu/Features";
import Close from "@/app/components/menu/Close";

export default function MyPage() {
  
  const router = useRouter();
  const data = useSession;
  const Logout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/login");
    });
  };
  
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleLogin();
        const profile = await getMyPage();
        setUserData(profile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.background}>
        <Close />
        <div className={styles.container}>
          <ProfileImage image={userData.userPhoto}/>
          <Info userData={userData} />
          <Category />
          <Features logout={Logout} />
        </div>
      </div>
    </div>
  );
}
