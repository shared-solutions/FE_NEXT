import Form from "./Form";

export default function Question() {
  const questions = {
    results: [
      {
        id: "1",
        name: "psward7733",
        time: "17:52",
        text: "최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..",
      },
      {
        id: "2",
        name: "psward7733",
        time: "17:52",
        text: "최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..",
      },
      {
        id: "3",
        name: "psward7733",
        time: "17:52",
        text: "최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..",
      },
      {
        id: "4",
        name: "psward7733",
        time: "17:52",
        text: "최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..",
      },
      {
        id: "5",
        name: "psward7733",
        time: "17:52",
        text: "최근에 새로운 취미를 찾고 있는데, 어떤 활동을 시작해야 할지 모르겠어요..",
      },
    ],
  };
  return (
    <div>
      {questions.results.map((item) => {
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
