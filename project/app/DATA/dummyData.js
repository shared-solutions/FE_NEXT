import userimg from "@/app/public/image/userimg.png";
import selectimg1 from "@/app/public/image/select1.png";
import selectimg2 from "@/app/public/image/select2.png";

export const voteData = [
  {
    reviewId: "1",
    userimg: userimg,
    nickname: "김태영",
    title: "저 신발 골라줘요",
    content: "솔직히 블랙이 예쁜데 흰색도 예뻐요",
    selectImgList: [selectimg1, selectimg2, selectimg1, selectimg2],
  },
  {
    reviewId: "1",
    userimg: userimg,
    nickname: "이지민",
    title: "부스터 추천좀 해주세요",
    content: "부스터 뭐를 먹어야 할지 모르겠어요",
    selectImgList: [selectimg1, selectimg2, selectimg1],
  },
  {
    reviewId: "1",
    userimg: userimg,
    nickname: "이가은",
    title: "베트남 가서 입을 옷 추천좀요",
    content: "어떤 옷이 예쁠까요?",
    selectImgList: [selectimg1, selectimg2, selectimg1],
  },
  {
    reviewId: "1",
    userimg: userimg,
    nickname: "고민경",
    title: "수강신청 해야되는데 어떤 과목이 나을까요",
    content: "강의 골라주세요",
    selectImgList: [selectimg1, selectimg2],
  },
];

export const detailData = [
  {
    userimg: userimg,
    username: "김태영",
    date: "2024-1-23",
    time: "11:59",
    title: "에어포스 색 추천좀",
    content: "에어포스 색 살건데 추천좀 해주세요",
    minititle: "화이트 or 블랙",
    point: "30",
    lefttime: "5",
    selectImgList: [selectimg1, selectimg2, selectimg1, selectimg2],
    viewCount: "234",
    likeCount: "65",
    commentCount: "23",
  },
];
