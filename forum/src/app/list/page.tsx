import { findAll } from '@/utils/database';

import { ListItem } from '@/components/List';

export default async function List() {
  let result = await findAll('forum', 'post');

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
