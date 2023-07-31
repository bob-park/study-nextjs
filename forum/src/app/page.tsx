import connectDB from '@/utils/database';

// * page 마다 캐싱 가능
// 60s 동안 cache 가능
// export const revalidate = 60;

/**
 * * nextjs 13 버전부터 build 시 달라졌음
 *
 * - ○ => static rendering (default)
 *     - 머 없으니까 html 페이지 그대로 client에게 보냄
 * - λ => dynamic rendering
 *     - client 가 페이지 접속때마다 html 새로 만들어서 보내줌
 *     - 다음 사용시 자동으로 dynamic rendering, 아래 아닌 경우 static rendering
 *          - fetch(..)
 *          - useSearchParams(..)
 *          - cookies()
 *          - headers()
 *          - [dynamic route]
 *
 *
 *
 *
 * @returns
 */
export default async function Home() {
  // mongodb connect
  // ! server component 안에 작성
  // ! 문제, page
  // const client = await MongoClient.connect(
  //   'mongodb://study:12345@localhost:27017/forum?authSource=admin',
  //   {},
  // );
  // const db = client.db('forum');

  // collections 안 데이터 모드 찾아서 return

  // const client = await connectDB;
  // const db = client.db('forum');

  // * db data 조회
  // ! DB 입출력 코드는 server component 안에서만 사용
  // let result = await db.collection('post').find().toArray();

  // console.log(result);

  // * page caching - build 해야 확인 가능 (dev 에서는 안됨)
  // URL 에 해당하는 페이지를 강제로 caching
  // 서버로 요청하는게 아니라, 특정 저장소에서 가져옴
  // await fetch('/URL', { cache: 'force-cache' });

  // * 강제로 caching 하지 않도록 하기
  // await fetch('/URL', { cache: 'no-store' });

  // * caching 을 60s 동안만 함
  // await fetch('/URL', { next: { revalidate: 60 } });

  // * db 조회도 caching 가능
  // db 조회를 api 로 만들고 fetch 를 사용한다.

  return <div>안녕</div>;
}
