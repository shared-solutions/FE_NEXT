"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import star_gray from "@/app/public/image/star_gray.png";
import star_yellow from "@/app/public/image/star_yellow.png";
import styles from "../../modules/savedCss/mycategory.module.scss";
//import Category from "./Category";

export default function MyCategory() {
  // const [educationClicked, setEducationClicked] = useState(false);
  // const [entertainmentClicked, setEntertainmentClicked] = useState(false);
  // const [lifeClicked, setLifeClicked] = useState(false);
  // const [economyClicked, setEconomyClicked] = useState(false);
  // const [shoppingClicked, setShoppingClicked] = useState(false);
  // const [etcClicked, setEtcClicked] = useState(false);
  // const [userData, setUserData] = useState([]);
  // // const categories = ["교육", "엔터테인먼트", "생활", "경제", "쇼핑", "기타"];

  // const [categoryList, setCategoryList] = useState([]);
  // const atkToken = localStorage.getItem("token");

  // const getCategoryClicked = (index) => {
  //   switch (index) {
  //     case 0:
  //       return educationClicked;
  //     case 1:
  //       return entertainmentClicked;
  //     case 2:
  //       return lifeClicked;
  //     case 3:
  //       return economyClicked;
  //     case 4:
  //       return shoppingClicked;
  //     case 5:
  //       return etcClicked;
  //     default:
  //       return false;
  //   }
  // };

  // const handleCategoryClick = (index) => {
  //   switch (index) {
  //     case 0:
  //       setEducationClicked(!educationClicked);
  //       break;
  //     case 1:
  //       setEntertainmentClicked(!entertainmentClicked);
  //       break;
  //     case 2:
  //       setLifeClicked(!lifeClicked);
  //       break;
  //     case 3:
  //       setEconomyClicked(!economyClicked);
  //       break;
  //     case 4:
  //       setShoppingClicked(!shoppingClicked);
  //       break;
  //     case 5:
  //       setEtcClicked(!etcClicked);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const getMyCategory = async () => {
  //   try {
  //     const url = new URL("https://dev.gomin-chingu.site/user/my-page/post");
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         atk: atkToken,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Get Category Data:", data);
  //       setCategoryList(
  //         data.result.postCategoryList.map((item) => item.category)
  //       );
  //     } else {
  //       console.error("Failed to get Category data:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };
  // const fetchDataForCategoryIds = async () => {
  //   try {
  //     // Array to store promises for each API call
  //     const fetchPromises = Array.from({ length: 6 }, (_, index) => {
  //       const categoryId = index + 1;
  //       return fetch(
  //         `http://dev.gomin-chingu.site/user/my-page/post/${categoryId}?page=0`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             atk: atkToken,
  //           },
  //         }
  //       );
  //     });

  //     // Use Promise.all to wait for all promises to resolve
  //     const responses = await Promise.all(fetchPromises);

  //     // Process each response
  //     responses.forEach(async (response, index) => {
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserData((prevUserData) => [
  //           ...prevUserData,
  //           data.result.postList,
  //         ]);
  //         console.log(
  //           "디테일 for categoryId",
  //           index + 1,
  //           ":",
  //           data.result.postList
  //         );
  //       } else {
  //         console.error(
  //           "Failed to fetch data for categoryId",
  //           index + 1,
  //           ":",
  //           response
  //         );
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // useEffect(() => {
  //   getMyCategory();
  //   fetchDataForCategoryIds();
  // }, []);
  // console.log("user", userData);

  // const getMyPage = async () => {
  //   try {
  //     const promises = categoryList.map(async (category, index) => {
  //       const url = new URL(
  //         `http://dev.gomin-chingu.site/user/my-page/post/${category}`
  //       );
  //       url.searchParams.append("page", "0");

  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           atk: atkToken,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserData((prevUserData) => {
  //           const updatedUserData = [...prevUserData];
  //           updatedUserData[index] = data.result.pollPostList;
  //           return updatedUserData;
  //         });
  //       } else {
  //         console.error("Failed to get MyPage data:", response);
  //       }
  //     });
  //     await Promise.all(promises);
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };
   return (
    <>
      <div className={styles.scrollContainer}>
        {/*userData.map((categoryData, index) => (
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
            <Category posts={userData} name={categoryList[index]} />
          </div>
            ))*/}
            <p>준비 중입니다</p>
      </div>
    </>
  );
}