import Icon from "./Icon";

export default function Features({ logout }) {
  return (
    <>
      <Icon text="설정" />
      <Icon text="문의하기" />
      <Icon text="로그아웃" onClick={logout} />
    </>
  );
}
