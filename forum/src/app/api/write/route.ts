import client from '@/utils/database';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { title, content, email } = await req.json();

  if (!title || !content || !email) {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  try {
    const db = (await client).db('forum');
    const collection = db.collection('post');

    await collection.insertOne({
      title,
      content,
      email,
    });

    return NextResponse.json({ result: 'success' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: '서버 이상함' }, { status: 500 });
  }
}
