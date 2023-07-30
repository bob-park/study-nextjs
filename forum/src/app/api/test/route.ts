import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('123');

  return NextResponse.json({ result: '안녕' });
}
