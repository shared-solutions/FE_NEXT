"use client";
import { useEffect, useState } from "react";
// import useStore from "@/app/zustand/editStore";
import styles from "@/app/modules/editCss/edit.module.scss";
import { handleLogin } from "@/app/api/user/login/login";
import { getMyInfo } from "@/app/api/user/modify/modify";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import Image from "next/image";
import default_image from "@/app/public/image/default_image.png";
import edit from "@/app/public/image/edit.png";
import EditImage from "@/app/components/edit/EditImage";
import EditInfo from "@/app/components/edit/EditInfo";
import EditPassword from "@/app/components/edit/EditPassword";

export default function Edit() {

  const { user, isEditing, toggleEditing, updateField } = useStore();
  const [userData, setUserData] = useState(user);

  
  const getMyPage = async () => {
    try {
       const atkToken =localStorage.getItem("token")
      const url = new URL(
        "https://dev.gomin-chingu.site/user/my-page/profile/modify"
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          atk: atkToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.result);
        console.log("MyPage data:", data);
      } else {
        console.error("MyPage 데이터를 가져오지 못했습니다:", response);
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <ProfileHeader header="회원정보 수정" />
        <div className={styles.imgContainer}>
          {userData.userImage ? (
            <Image
              src={userData.userImage}
              alt="default image"
              className={styles.imageShadow}
              width={110}
              height={110}
            />
          ) : (
            <Image
              src={default_image}
              alt="default image"
              className={styles.imageShadow}
              width={110}
              height={110}
            />
          )}
          <Image
            src={edit}
            alt="edit"
            className={styles.edit}
            width={32}
            height={32}
          />
        </div>
      </div>
      <div></div>
      <div className={styles.content}>
        <EditImage userData={userData}/>
        <div className={styles.profile}>
          <h4>프로필</h4>
          <div className={styles.profile_content}>
            <EditInfo userData={userData} type="닉네임" />
            <EditInfo userData={userData} type="이메일" />
            <EditInfo userData={userData} type="휴대폰 번호" />
          </div>
        </div>
        <div className={styles.profile}>
          <h4>보안 설정</h4>
          <div className={styles.profile_content}>
            <EditPassword/>
          </div>
        </div>
      </div>
    </>
  );
}
