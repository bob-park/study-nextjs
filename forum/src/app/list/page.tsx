import { findAll } from '@/utils/database';

import DetailLink from './DetailLink';

export default async function List() {
  let result = await findAll('forum', 'post');

  return (
    <div className="bg-gray-100 p-[10px]">
      <div className="">
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
