export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>현대카드 무이자이벤트중</p>
      {children}
    </div>
  );
}
