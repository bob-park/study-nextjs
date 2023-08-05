import { findAll } from '@/utils/database';

import PostClient from './PostClient';

// 강제로 dynamic rendering 으로 수정
export const revalidate = 20;

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
