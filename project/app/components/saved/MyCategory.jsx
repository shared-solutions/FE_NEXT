import { useEffect, useState } from "react";
import Image from "next/image";
import star_gray from "@/app/public/image/star_gray.png";
import star_yellow from "@/app/public/image/star_yellow.png";
import styles from "../../modules/savedCss/mycategory.module.scss";
import Category from "./Category";

export default function MyCategory() {
  const [educationClicked, setEducationClicked] = useState(false);
  const [entertainmentClicked, setEntertainmentClicked] = useState(false);
  const [lifeClicked, setLifeClicked] = useState(false);
  const [economyClicked, setEconomyClicked] = useState(false);
  const [shoppingClicked, setShoppingClicked] = useState(false);
  const [etcClicked, setEtcClicked] = useState(false);
  const [userData, setUserData] = useState([]);
  const categories = ["교육", "엔터테인먼트", "생활", "경제", "쇼핑", "기타"];

  const getCategoryClicked = (index) => {
    switch (index) {
      case 0:
        return educationClicked;
      case 1:
        return entertainmentClicked;
      case 2:
        return lifeClicked;
      case 3:
        return economyClicked;
      case 4:
        return shoppingClicked;
      case 5:
        return etcClicked;
      default:
        return false;
    }
  };

  const handleCategoryClick = (index) => {
    switch (index) {
      case 0:
        setEducationClicked(!educationClicked);
        break;
      case 1:
        setEntertainmentClicked(!entertainmentClicked);
        break;
      case 2:
        setLifeClicked(!lifeClicked);
        break;
      case 3:
        setEconomyClicked(!economyClicked);
        break;
      case 4:
        setShoppingClicked(!shoppingClicked);
        break;
      case 5:
        setEtcClicked(!etcClicked);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 보장
    const atkToken = localStorage.getItem("token");

    const getMyPage = async () => {
      try {
        const promises = categories.map(async (category) => {
          const url = new URL(
            `https://dev.gomin-chingu.site/posts/poll-post/${category}`
          );
          url.searchParams.append("page", "0");
          url.searchParams.append("size", "3");
          url.searchParams.append("category", category);

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              atk: atkToken,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData((prevUserData) => [
              ...prevUserData,
              data.result.pollPostList,
            ]);
          } else {
            console.error("Failed to get MyPage data:", response);
          }
        });
        await Promise.all(promises);
      } catch (error) {
        console.error("Error", error);
      }
    };

    getMyPage();
  }, []);

  return (
    <>
      <div className={styles.scrollContainer}>
        {userData.map((categoryData, index) => (
          <div
            key={index}
            className={styles.list}
            style={{
              backgroundColor: getCategoryClicked(index)
                ? "#FFF9BF"
                : "#F4F4F4",
            }}
          >
            <Image
              src={getCategoryClicked(index) ? star_yellow : star_gray}
              alt="star"
              onClick={() => handleCategoryClick(index)}
              style={{
                marginBottom: "80%",
                marginLeft: "83%",
              }}
            />
            <Category posts={categoryData} name={categories[index]} />
          </div>
        ))}
      </div>
    </>
  );
}
