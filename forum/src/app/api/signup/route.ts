import { NextRequest, NextResponse } from 'next/server';

import client from '@/utils/database';

export async function POST(req: NextRequest) {
  const { userId, password } = await req.json();

  if (!userId || !password) {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  try {
    const db = (await client).db('forum');
    const users = db.collection('users');

    // 중복 사용자 확인
    let existUser = await users.findOne({ userId });

    if (existUser) {
      return NextResponse.json({ error: '이미 존재함' }, { status: 400 });
    }

    await users.insertOne({
      userId,
      password,
    });

    return NextResponse.json({ result: true }, { status: 201 });
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ error: '서버 이상함' }, { status: 500 });
}
