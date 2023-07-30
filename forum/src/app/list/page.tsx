import { findAll } from '@/utils/database';

import DetailLink from './DetailLink';
import Link from 'next/link';

export default async function List() {
  let result = await findAll('forum', 'post');

  return (
    <div className="bg-gray-100 p-[10px]">
      <Link href="/write">글쓰기</Link>
      <div className="mt-[50px]">
        {result.map((item) => (
          <DetailLink
            key={`list_item_${item._id}`}
            id={item._id.toString()}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
}
