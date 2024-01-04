

export default async function HomeLayout({children,modal}){
    return (
        <div className="w-full">
            {children}
            {modal}
        </div>
    )

}
    