export default async function AfterLoginLayout({ children }) {
    return (
      <div>
        로그인됐을때 부모페이지(레이아웃페이지)
        {children}
      </div>
    )
  }