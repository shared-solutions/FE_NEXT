


export default async function AfterLoginLayout({ children }) {
    return (
        <main> 
            <div className='relative'>{children}
                로그인됐을때 창
            </div>

        </main>
     
        
    )
  }