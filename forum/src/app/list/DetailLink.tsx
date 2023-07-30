'use client';

import { useRouter } from 'next/navigation';

import { ListItem } from '@/components/List';
import Link from 'next/link';

type DetailLinkProps = {
  id: string;
  title: string;
  content?: string;
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
export default function DetailLink({ id, title, content }: DetailLinkProps) {
  const router = useRouter();

  // handle
  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  return (
    <ListItem
      title={title}
      content={content}
      onClick={() => router.push(`/detail/${id}`)}
      onEdit={handleEdit}
    />
  );
}
