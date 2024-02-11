"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "@/app/zustand/editStore";
import styles from "@/app/modules/editCss/edit.module.scss";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import ProfileImage from "@/app/components/menu/ProfileImage";
import Image from "next/image";
import default_image from "@/app/public/image/default_image.png";
import edit from "@/app/public/image/edit.png";
import profile from "@/app/public/image/profile.png";
import mail from "@/app/public/image/mail.png";
import phone from "@/app/public/image/phone.png";
import password from "@/app/public/image/password.png";
import CloseImg from "@/app/components/edit/CloseImg";
import EditNickName from "@/app/components/edit/EditNickname";
import EditInfo from "@/app/components/edit/EditInfo";
import EditEmail from "@/app/components/edit/EditEmail";
import EditPhone from "@/app/components/edit/EditPhone";
import EditSecuritypw from "@/app/components/edit/EditSecuritypw";
import EditSecurityEmail from "@/app/components/edit/EditSecurityEmail";

export default function Edit() {
  const { user, isEditing, toggleEditing, updateField } = useStore();

  const [userData, setUserData] = useState(user);
  const handleLogin = async () => {
    try {
      const endpoint = "https://dev.gomin-chingu.site/user/login";
      const requestBody = {
        email: process.env.NEXT_PUBLIC_USER_EMAIL,
        password: process.env.NEXT_PUBLIC_USER_PASSWORD,
      };
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.result[0].token) {
        localStorage.setItem("token", response.data.result[0].token);
        console.log();
        //alert("성공적으로 로그인했습니다!");
      }
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
      //alert("ID 또는 비밀번호가 틀립니다.");
    }
  };

  const atkToken = localStorage.getItem("token");

  const getMyPage = async () => {
    try {
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
        console.error("Failed to get MyPage data:", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    handleLogin();
    getMyPage();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <ProfileHeader header="회원정보 수정" />
        <div className={styles.imgContainer}>
          <Image
            src={default_image}
            alt="default image"
            className={styles.imageShadow}
            width={110}
            height={110}
          />
          <Image
            src={edit}
            alt="edit"
            className={styles.edit}
            width={32}
            height={32}
          />
        </div>
      </div>
      <div>
        <ProfileImage />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          <h3>{userData.nickName}님</h3>
          {isEditing.nickname ? (
            <CloseImg onClick={() => toggleEditing("nickname")} />
          ) : (
            <p
              className={styles.yellow}
              onClick={() => toggleEditing("nickname")}
            >
              수정
            </p>
          )}
        </div>
        {isEditing.nickname && (
          <EditNickName
            onChange={(e) => updateField("nickname", e.target.value)}
          />
        )}
        <div className={styles.profile}>
          <h4>프로필</h4>
          <div className={styles.profile_content}>
            <div className={styles.grid}>
              <Image src={profile} alt="profile" />
              <p>{userData.nickName}</p>
              {isEditing.name ? (
                <CloseImg onClick={() => toggleEditing("name")} />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("name")}
                >
                  수정
                </p>
              )}
              {isEditing.name && (
                <>
                  <EditInfo
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </>
              )}
            </div>
            <div className={styles.grid}>
              <Image src={mail} alt="mail" />
              <p>{userData.email}</p>
              {isEditing.email ? (
                <CloseImg onClick={() => toggleEditing("email")} />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("email")}
                >
                  수정
                </p>
              )}
              {isEditing.email && (
                <EditEmail
                  onChange={(e) => updateField("email", e.target.value)}
                />
              )}
            </div>
            <div className={styles.grid}>
              <Image
                src={phone}
                alt="phone"
                style={{ marginLeft: "0.15rem" }}
              />
              <p>{userData.phone}</p>
              {isEditing.phone ? (
                <CloseImg onClick={() => toggleEditing("phone")} />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("phone")}
                >
                  수정
                </p>
              )}
              {isEditing.phone && (
                <EditPhone
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.profile}>
          <h4>보안 설정</h4>
          <div className={styles.profile_content}>
            <div className={styles.grid}>
              <Image
                src={password}
                alt="password"
                style={{ marginLeft: "0.08rem" }}
              />
              <p>비밀번호</p>
              {isEditing.password ? (
                <CloseImg onClick={() => toggleEditing("password")} />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("password")}
                >
                  수정
                </p>
              )}
              {isEditing.password && (
                <EditSecuritypw
                  onChange={(e) => updateField("password", e.target.value)}
                />
              )}
            </div>
            <div className={styles.grid}>
              <Image src={mail} alt="mail" width={18} height={18} />
              <p>보안 인증 메일</p>
              {isEditing.security ? (
                <CloseImg onClick={() => toggleEditing("security")} />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("security")}
                >
                  수정
                </p>
              )}
              {isEditing.security && <EditSecurityEmail />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
