"use client";
import { useEffect, useState, useCallback } from "react";
import { categoryStore } from "@/app/zustand/categoryStore";
import { motion, AnimatePresence } from "framer-motion";
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
  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const openModal = (category, postList) => {
    setSelectedName(category);
    setSelectedPostList(postList);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const atkToken = localStorage.getItem("token");

      for (const category of categoryNum) {
        const url = new URL(
          `https://dev.gomin-chingu.site/user/my-page/post/${category}`
        );
        url.searchParams.append("page", page);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            atk: atkToken,
          },
        });
        const data = await response.json();

        if (data.result.postList.length === 0) {
          //setHasMoreData(false);
          continue;
        } else {
          setUserData((prevUserData) => {
            const categoryToUpdateIndex = prevUserData.findIndex(item => item.category === data.result.name);

            if (categoryToUpdateIndex !== -1) {
              // 이미 존재하는 카테고리인 경우
              const updatedUserData = [...prevUserData];
              const existingCategory = updatedUserData[categoryToUpdateIndex];
              // 기존의 postList에 새로운 데이터를 추가
              existingCategory.postList = [...existingCategory.postList, ...data.result.postList];
              return updatedUserData;
            } else {
              return [
                ...prevUserData,
                { category: data.result.name, postList: data.result.postList },
              ];
            }
          });
          setPage((prevPage) => prevPage + 1);
          console.log("카테고리 데이터들", data);
          console.log("카테고리 이름", data.result.name);
          console.log(category);
        }
      }
      // 데이터 가져올 때까지 기다리기
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  }, [page, categoryNum]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    if (scrollY + windowHeight >= bodyHeight - 200 && hasMoreData) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleCategoryClick = (category) => {
    setCategoryClicked(category, !categories[category]);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.scrollContainer}>
          {userData.map((data) => (
            <div
              key={data.postList.postId}
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
      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modal}>
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                backgroundColor: categories[selectedName]
                  ? "#FFF7A5"
                  : "#F4F4F4",
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
