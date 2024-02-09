"use client";
// import { useEffect, useState } from "react";
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
import close_round from "@/app/public/image/close_round.png";

export default function Edit() {
  const { user, isEditing, toggleEditing, updateField } = useStore();
  /*
  useEffect(() => {
    나중에 api 받아오기
    // Example: fetchUserData().then((userData) => updateUserData(userData));
  }, []);
  */
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
          <h3>{user.nickname}</h3>
          {isEditing.nickname ? (
            <Image
              src={close_round}
              alt="close"
              width={18}
              height={18}
              onClick={() => toggleEditing("nickname")}
            />
          ) : (
            <p
              className={styles.yellow}
              onClick={() => toggleEditing("nickname")}
            >
              수정
            </p>
          )}
          {isEditing.nickname && (
            <input
              type="text"
              placeholder="Enter your name"
              value={user.nickname}
              onChange={(e) => updateField("nickname", e.target.value)}
            />
          )}
        </div>
        <div className={styles.profile}>
          <h4>프로필</h4>
          <div className={styles.profile_content}>
            <div className={styles.grid}>
              <Image src={profile} alt="profile" />
              <p>{user.name}</p>
              {isEditing.name ? (
                <Image
                  src={close_round}
                  alt="close"
                  width={18}
                  height={18}
                  onClick={() => toggleEditing("name")}
                />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("name")}
                >
                  수정
                </p>
              )}
              {isEditing.name && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={user.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              )}
            </div>
            <div className={styles.grid}>
              <Image src={mail} alt="mail" />
              <p>{user.email}</p>
              {isEditing.email ? (
                <Image
                  src={close_round}
                  alt="close"
                  width={18}
                  height={18}
                  onClick={() => toggleEditing("email")}
                />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("email")}
                >
                  수정
                </p>
              )}
              {isEditing.email && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={user.email}
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
              <p>{user.phone}</p>
              {isEditing.phone ? (
                <Image
                  src={close_round}
                  alt="close"
                  width={18}
                  height={18}
                  onClick={() => toggleEditing("phone")}
                />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("phone")}
                >
                  수정
                </p>
              )}
              {isEditing.phone && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={user.phone}
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
              <p>{user.password}</p>
              {isEditing.password ? (
                <Image
                  src={close_round}
                  alt="close"
                  width={18}
                  height={18}
                  onClick={() => toggleEditing("password")}
                />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("password")}
                >
                  수정
                </p>
              )}
              {isEditing.password && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={user.password}
                  onChange={(e) => updateField("email", e.target.password)}
                />
              )}
            </div>
            <div className={styles.grid}>
              <Image src={mail} alt="mail" width={18} height={18} />
              <p>보안 인증 메일</p>
              {isEditing.security ? (
                <Image
                  src={close_round}
                  alt="close"
                  width={18}
                  height={18}
                  onClick={() => toggleEditing("security")}
                />
              ) : (
                <p
                  className={styles.yellow}
                  onClick={() => toggleEditing("security")}
                >
                  수정
                </p>
              )}
              {isEditing.security && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={user.security}
                  onChange={(e) => updateField("security", e.target.password)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
