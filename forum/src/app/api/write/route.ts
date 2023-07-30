import client from '@/utils/database';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  const db = (await client).db('forum');

  const collection = db.collection('post');

  await collection.insertOne({
    title,
    content,
  });

  return NextResponse.json({ result: 'success' }, { status: 201 });
}
