import Form from "./Form";

export default function Question({ data }) {
  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return formattedTime;
  };
  return (
    <div>
      {data.map((item) => {
        return (
          <Form
            key={item.createdAt}
            name={item.nickName}
            time={formatTime(item.createdAt)}
            text={item.title}
            like_num={item.postLike}
            comment_num={item.comment}
          />
        );
      })}
    </div>
  );
}
