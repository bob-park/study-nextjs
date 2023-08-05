import fs from 'fs';
import client from '@/utils/database';
import { getServerSession } from 'next-auth';

import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const IMG_DIR_PATH = process.env.IMAGE_DIR_PATH;

export async function POST(req: NextRequest) {
  let session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // const { title, content } = await req.json();

  const formData = await req.formData();

  const title = formData.get('title');
  const content = formData.get('content');

  const img = formData.get('img') as File;

  let imgPath = null;

  if (img) {
    const extension = img.name.substring(img.name.lastIndexOf('.') + 1);
    imgPath = new Date().getTime() + '.' + extension;

    fs.createWriteStream(IMG_DIR_PATH + '/' + imgPath).write(
      Buffer.from(await img.arrayBuffer()),
    );
  }

  if (!title || !content) {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  try {
    const db = (await client).db('forum');
    const collection = db.collection('post');

    await collection.insertOne({
      title,
      content,
      imgPath,
      author: session.user.email,
    });

    return NextResponse.json({ result: 'success' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: '서버 이상함' }, { status: 500 });
  }
}
