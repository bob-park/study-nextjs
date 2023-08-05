import { NextRequest, NextResponse } from 'next/server';

import clientPromise from '@/utils/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  let session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const currentUser = session.user.email;

  const db = (await clientPromise).db('forum');
  const post = db.collection('post');

  let item = await post.findOne({ _id: new ObjectId(params.postId) });

  if (item?.author != currentUser) {
    return NextResponse.json({ error: 'Forbbiden' }, { status: 403 });
  }

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
