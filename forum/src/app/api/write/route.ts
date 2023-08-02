import client from '@/utils/database';
import { getServerSession } from 'next-auth';

import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  let session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  try {
    const db = (await client).db('forum');
    const collection = db.collection('post');

    await collection.insertOne({
      title,
      content,
      author: session.user.email,
    });

    return NextResponse.json({ result: 'success' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: '서버 이상함' }, { status: 500 });
  }
}
