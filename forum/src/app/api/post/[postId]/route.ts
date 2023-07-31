import { NextRequest, NextResponse } from 'next/server';

import clientPromise from '@/utils/database';
import { ObjectId } from 'mongodb';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const db = (await clientPromise).db('forum');
  const post = db.collection('post');

  await post.deleteOne({
    _id: new ObjectId(params.postId),
  });

  return NextResponse.json(
    {
      result: true,
    },
    { status: 200 },
  );
}
