import { NextResponse } from 'next/server';

import client, { findAll } from '@/utils/database';

export async function GET() {
  let result = await findAll('forum', 'post');

  return NextResponse.json(result);
}
