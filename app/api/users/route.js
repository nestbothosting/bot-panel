// app/api/user/route.js
import { NextResponse } from 'next/server';
import { GetUserData } from '@/utilise/apis';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');
  const page = searchParams.get('page');

  const response = await GetUserData(userId, page);

  if (!response) {
    return NextResponse.json(
      { error: 'User not found or invalid ID' },
      { status: 404 }
    );
  }

  const safeUser = JSON.parse(JSON.stringify(response));
  return NextResponse.json(safeUser);
}
