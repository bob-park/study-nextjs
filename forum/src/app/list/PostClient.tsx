'use client';

import { useRouter } from 'next/navigation';

import { ListItem } from '@/components/List';
import { useState } from 'react';

type Post = {
  id: string;
  title: string;
  content?: string;
};

type PostClientProps = {
  contents: Post[];
};

/**
 *
 *  * useRouter 는 client component 안에서만 사용 가능
 *  ! `next/navigation` 를 import 해야된다.
 *
 *  * prefetch(..) => 페이지에 필요한 컴포넌트 미리 로드함
 *  * <Link /> 가 prefetch() 를 갔다 쓰는 거임
 *  ! <Link /> 의 prefetch 속성으로 제어할 수 있음 - 단, 개발할때 확인이 불가능
 *
 *
 * @param param0
 * @returns
 */
export default function PostClient({ contents }: PostClientProps) {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>(contents);

  // handle
  const handleRemove = async (id: string) => {
    try {
      await fetch(`/api/post/${id}`, {
        method: 'delete',
      }).then((res) => {
        setPosts((prev) => {
          const newPosts = prev.filter((newPost) => newPost.id !== id);

          return newPosts;
        });
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      {posts.map((item) => (
        <ListItem
          key={`post_client_item_${item.id}`}
          className="transition-opacity"
          title={item.title}
          content={item.content}
          onClick={() => router.push(`/detail/${item.id}`)}
          onEdit={() => router.push(`/edit/${item.id}`)}
          onRemove={() => handleRemove(item.id)}
        />
      ))}
    </div>
  );
}
