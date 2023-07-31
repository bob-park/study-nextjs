import { findAll } from '@/utils/database';

import DetailLink from './PostClient';
import PostClient from './PostClient';

/**
 *
 * ! 문제가 있네... mongodb 에서 값이 바로 적용되는데 이게 next page 에서 caching 하고 있는지 바로 적용이 안된다
 * ! 아 알았다. 이미 server component 가 로드되어 있기 때문에, <Link /> 든 router 를 써서 페이지를 이동하면, 이미 로드된 page 를 보여주는 구만
 * ! 이걸 해결할려면, redux + sage 를 써서 페이지 접속 시 먼가 작업을 해줘야 되는 구만
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
          isRemove: false,
        }))}
      />
    </div>
  );
}
