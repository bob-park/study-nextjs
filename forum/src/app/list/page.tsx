import Link from 'next/link';

import { findAll } from '@/utils/database';

import { ListItem } from '@/components/List';

export default async function List() {
  let result = await findAll('forum', 'post');

  return (
    <div className="bg-gray-100 p-[10px]">
      {result.map((item) => (
        <Link key={`list_item_${item._id}`} href={`/detail/${item._id}`}>
          <ListItem title={item.title} content={item.content} />
        </Link>
      ))}
    </div>
  );
}
