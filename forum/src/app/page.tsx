import connectDB from '@/utils/database';

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

  const client = await connectDB;
  const db = client.db('forum');

  // * db data 조회
  // ! DB 입출력 코드는 server component 안에서만 사용
  let result = await db.collection('post').find().toArray();

  console.log(result);

  return <div>안녕</div>;
}
