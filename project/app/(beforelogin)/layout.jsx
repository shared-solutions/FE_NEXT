export default async function HomeLayout({ children, modal }) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
