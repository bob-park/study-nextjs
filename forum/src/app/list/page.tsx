import { findAll } from '@/utils/database';

import DetailLink from './PostClient';
import PostClient from './PostClient';

/**
 *
 * ! 문제가 있네... mongodb 에서 값이 바로 적용되는데 이게 next page 에서 caching 하고 있는지 바로 적용이 안된다
 *
 * @returns
 *
 */
export default async function List() {
  let result = await findAll('forum', 'post');

  return (
    <div className="bg-gray-100 p-[10px]">
      <PostClient
        contents={result.map((item) => ({
          id: item._id.toString(),
          title: item.title,
          content: item.content,
        }))}
      />
    </div>
  );
}
