import client from '@/utils/database';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const body = await req.json();

  try {
    const db = (await client).db('forum');
    const post = db.collection('post');

    await post.updateOne(
      { _id: new ObjectId(params.postId) },
      {
        $set: body,
      },
    );

    return NextResponse.json({ result: true }, { status: 200 });
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ error: '서버 이상함' }, { status: 500 });
}
