import Link from "next/link";
 
export default function NotFound() {
  return (
    <div>
      <h2>Error</h2>
      <p>해당 페이지는 존재하지 않습니다.</p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  )
}