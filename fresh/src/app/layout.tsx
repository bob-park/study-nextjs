import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '밥 후레시',
  description: '밥 후레시 이다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* nextjs 에서 공통된 UI 는 여기서 하쟈 */}
        {/* 정확히 말하자면, page 모듈 위에 layout 모듈 있고, 상위 폴더 도 동일하게 되며, 상위 폴더에 하위 폴더에 있는 page 모둘 + layout 모둘이 감싸짐 */}
        {/* main bar */}
        <div className="bg-white p-[20px] text-black">
          {/* <a> 와 같지만, nextjs 에서 부드럽게 페이지 전환됨 */}
          <Link className="mr-[10px] no-underline" href="/">
            홈
          </Link>
          <Link href="/list">List</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
