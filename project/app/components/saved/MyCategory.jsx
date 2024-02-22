"use client";
import { useEffect, useState } from "react";
import { categoryStore } from "@/app/zustand/categoryStore";
import Image from "next/image";
import star_gray from "@/app/public/image/star_gray.png";
import star_yellow from "@/app/public/image/star_yellow.png";
import close_round from "@/app/public/image/close_round.png";
import styles from "../../modules/savedCss/mycategory.module.scss";
import Category from "./Category";
import Post from "./Post";
import Link from "next/link";

export default function MyCategory() {
  const { categories, setCategoryClicked } = categoryStore();

  const [userData, setUserData] = useState([]);
  const categoryNum = [1, 2, 3, 4, 5, 6];
  const [isLoading, setLoading] = useState(true);
  const [selectedPostList, setSelectedPostList] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (category, postList) => {
    setSelectedName(category);
    setSelectedPostList(postList);
    setIsModalOpen(true);
    console.log(selectedPostList);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getMyCategory = async () => {
      try {
        const atkToken = localStorage.getItem("token");
        const fetchData = async () => {
          for (const category of categoryNum) {
            const url = new URL(
              `https://dev.gomin-chingu.site/user/my-page/post/${category}`
            );
            url.searchParams.append("page", "0");

            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                atk: atkToken,
              },
            });

            if (response.ok) {
              const data = await response.json();
              console.log("카테고리 데이터들", data);
              setUserData((prevUserData) => [
                ...prevUserData,
                { category: data.result.name, postList: data.result.postList },
              ]);
            } else {
              console.error("카테고리 상세보기 실패", response);
            }
          }
          // 데이터 가져올 때까지 기다리기
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        };

        fetchData();
      } catch (error) {
        console.error("Error", error);
      }
    };

    getMyCategory();
  }, []);

  const handleCategoryClick = (category) => {
    setCategoryClicked(category, !categories[category]);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.scrollContainer}>
          {userData.map((data) => (
            <div
              key={data.postList.title}
              className={styles.list}
              style={{
                backgroundColor: categories[data.category]
                  ? "#FFF7A5"
                  : "#F4F4F4",
              }}
              onClick={() => openModal(data.category, data.postList)}
            >
              <Image
                src={categories[data.category] ? star_yellow : star_gray}
                alt="star"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCategoryClick(data.category);
                }}
                style={{
                  marginBottom: "80%",
                  marginLeft: "83%",
                }}
              />
              {!isModalOpen && (
                <Category posts={data.postList} name={data.category} />
              )}
            </div>
          ))}
        </div>
      )}
      {/*Modal*/}
      {isModalOpen && (
        <div className={styles.modal}>
          <div
            className={styles.modalContent}
            style={{
              backgroundColor: categories[selectedName] ? "#FFF7A5" : "#F4F4F4",
            }}
          >
            <div className={styles.header}>
              <h3>{selectedName}</h3>
            </div>
            <Image
              src={close_round}
              alt="close"
              width={19}
              height={19}
              className={styles.close}
              onClick={closeModal}
            />
            {selectedPostList.map((post) => (
              <Link
                key={post.postId}
                href={`/viewdetail/${post.postId}`}
                style={{ textDecoration: "none", color: "black", margin: 0 }}
              >
                <Post
                  key={post.title}
                  day={post.ago}
                  header={post.title}
                  text={post.content}
                  like_num={post.postLike}
                  comment_num={post.comment}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
