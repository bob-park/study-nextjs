import { ObjectId } from 'mongodb';

import clientPromise from '@/utils/database';
import Comment from './Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 *
 * * props 에는 부모 page 에서 념겨 받은 props 뿐만 아니라 url 의 dynamic route 부분의 입력한 값을 props 로 전달 받을 수 있다.
 *
 * @param param0
 * @returns
 */
export default async function DetailPost({
  params,
}: {
  params: { postId: string };
}) {
  const session = await getServerSession(authOptions);

  const db = (await clientPromise).db('forum');

  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.postId) });

  return (
    <div className="m-[20px]">
      <h4>상세 페이지 </h4>
      <h4>{result?.title}</h4>
      <p>{result?.content}</p>
      <Comment currentEmail={session?.user?.email} postId={params.postId} />
    </div>
  );
}
