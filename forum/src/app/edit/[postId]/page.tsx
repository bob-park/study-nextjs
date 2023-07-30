import client from '@/utils/database';
import { ObjectId } from 'mongodb';
import EditDetail from './EditDetail';

export default async function Edit({ params }: { params: { postId: string } }) {
  const db = (await client).db('forum');
  const post = db.collection('post');

  let item = await post.findOne({ _id: new ObjectId(params.postId) });

  if (!item) {
    return null;
  }

  return (
    <div className="p-[20px]">
      <h4 className="font-extrabold text-3xl mb-[20px]">글 수정</h4>
      <EditDetail
        id={item._id.toString()}
        title={item.title}
        content={item.content}
      />
    </div>
  );
}
