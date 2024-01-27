import Form from "./Form";
export default function Answer() {
  const answers = {
    results: [
      {
        id: "1",
        name: "psward7733",
        time: "17:52",
        text: "그냥 편하게 생각하시면 될 듯 합니다 가족들과 대화를 시작해보고 해결방법을 찾아보세요.",
      },
      {
        id: "2",
        name: "psward7733",
        time: "17:52",
        text: "그냥 편하게 생각하시면 될 듯 합니다 가족들과 대화를 시작해보고 해결방법을 찾아보세요.",
      },
      {
        id: "3",
        name: "psward7733",
        time: "17:52",
        text: "그냥 편하게 생각하시면 될 듯 합니다 가족들과 대화를 시작해보고 해결방법을 찾아보세요.",
      },
      {
        id: "4",
        name: "psward7733",
        time: "17:52",
        text: "그냥 편하게 생각하시면 될 듯 합니다 가족들과 대화를 시작해보고 해결방법을 찾아보세요.",
      },
      {
        id: "5",
        name: "psward7733",
        time: "17:52",
        text: "그냥 편하게 생각하시면 될 듯 합니다 가족들과 대화를 시작해보고 해결방법을 찾아보세요.",
      },
    ],
  };
  return (
    <div>
      {answers.results.map((item) => {
        return (
          <Form
            key={item.id}
            name={item.name}
            time={item.time}
            text={item.text}
          />
        );
      })}
    </div>
  );
}
