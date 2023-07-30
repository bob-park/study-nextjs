import connectDB from '@/utils/database';

import { ListItem } from '@/components/List';

export default async function List() {
  const client = await connectDB;
  const db = client.db('forum');

  // * js 에서 좀 늦게 처리되는 코드는 선언하여 기다리지 않고 처리하게 할 수 있음
  // * 근데 `await` 키워드를 붙이면 실행을 기달림
  // * Promise<T> 가 선언된 녀석만 가능
  let result = await db.collection('post').find().toArray();

  return (
    <div className="bg-gray-100 p-[10px]">
      {result.map((item) => (
        <ListItem
          key={`list_item_${item._id}`}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
}
