import Icon from "./Icon";
import Link from "next/link";
export default function Features({ logout }) {
  return (
    <>
      <Link
        href="/setting"
        style={{
          textDecoration: "none",
          color: "black",
          width: "86%",
        }}
      >
        <Icon text="설정" />
      </Link>
      <Icon text="문의하기" />
      <Icon text="로그아웃" onClick={logout} />
    </>
  );
}
