import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import client from '@/utils/database';
import { ObjectId } from 'mongodb';
import { findAll } from '@/utils/database';

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  let session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { comment } = await req.json();

  if (!comment) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  try {
    const db = (await client).db('forum');
    const collection = db.collection('post');

    const post = await collection.findOne({ _id: new ObjectId(params.postId) });

    if (!post) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const comments = db.collection('comments');

    await comments.insertOne({
      comment,
      parent: post._id,
      author: session.user?.email,
      createAt: new Date(),
    });

    return NextResponse.json({ result: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: '서버 이상함' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const db = (await client).db('forum');
    const posts = db.collection('post');

    const post = await posts.findOne({ _id: new ObjectId(params.postId) });

    if (!post) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const comments = db.collection('comments');

    const result = await comments
      .find({ parent: post._id })
      .sort({ createAt: 'desc' })
      .toArray();

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: '서버 이상함' }, { status: 500 });
  }
}
