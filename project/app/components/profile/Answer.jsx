import Link from "next/link";
import Form from "./Form";

export default function Answer({ data }) {
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
      {data.map((item) => (
        <Link
          key={item.postId}
          href={`/viewdetail/${item.postId}`}
          style={{ textDecoration: "none", color: "black", margin: 0 }}
        >
          <Form
            key={item.createdAt}
            name={item.nickName}
            time={formatTime(item.createdAt)}
            text={item.content}
            like_num={item.commentLike}
            comment_num={item.reComment}
          />
        </Link>
      ))}
    </div>
  );
}
