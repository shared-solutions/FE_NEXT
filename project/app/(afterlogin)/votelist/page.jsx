import Vote from "../../components/Vote";
import Link from "next/link";
export default function VoteList() {
  const votelists = {
    results: [
      {
        id: "1",
        day: "1",
        header: "배고프네요 뭐 먹을까요?",
        text: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ",
      },
      {
        id: "2",
        day: "1",
        header: "배고프네요 뭐 먹을까요?",
        text: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ",
      },
      {
        id: "3",
        day: "1",
        header: "배고프네요 뭐 먹을까요?",
        text: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ",
      },
      {
        id: "4",
        day: "1",
        header: "배고프네요 뭐 먹을까요?",
        text: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ",
      },
      {
        id: "5",
        day: "1",
        header: "배고프네요 뭐 먹을까요?",
        text: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ",
      },
      {
        id: "6",
        day: "1",
        header: "배고프네요 뭐 먹을까요?",
        text: "먹을 것 추천 좀 해주세요 두개 중에 골라주세요 ㅋ",
      },
    ],
  };
  return (
    <>
      {votelists.results.map((item) => {
        return (
          <Link key={item.id} href={`/votelist/${item.id}`}>
            <Vote day={item.day} header={item.header} text={item.text} />
          </Link>
        );
      })}
    </>
  );
}
