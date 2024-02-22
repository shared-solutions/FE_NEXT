"use client";
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
  // const categories = ["교육", "엔터테인먼트", "생활", "경제", "쇼핑", "기타"];
  const categoryNum = [1, 2, 3, 4, 5, 6];
  const [isLoading, setLoading] = useState(true);

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
    const getMyCategory = async () => {
      try {
        const atkToken = localStorage.getItem("token");
        // ... (existing code)

        // Fetch API data
        const fetchData = async () => {
          for (const category of categoryNum) {
            const url = new URL(`https://dev.gomin-chingu.site/user/my-page/post/${category}`);
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

          // After fetching data, set loading to false after 5 seconds
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
  
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.scrollContainer}>
          {userData.map((data, index) => (
            <div
              key={data.postList.title}
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
              <Category posts={data.postList} name={data.category} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
