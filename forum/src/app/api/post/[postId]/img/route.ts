import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/utils/database';
import { ObjectId } from 'mongodb';

const IMG_DIR_PATH = process.env.IMAGE_DIR_PATH;

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  const db = (await connectDB).db('forum');
  const posts = db.collection('post');

  const post = await posts.findOne({ _id: new ObjectId(params.postId) });

  if (!post) {
    return NextResponse.json({ error: 'Not Found.' }, { status: 404 });
  }

  const { imgPath } = post;

  const buffer = fs.readFileSync(IMG_DIR_PATH + '/' + imgPath);

  const headers = new Headers();
  headers.set(
    'Content-Type',
    `image/${imgPath.substring(imgPath.lastIndexOf('.') + 1)}`,
  );

  return new NextResponse(buffer, {
    status: 200,
    headers,
  });
}
