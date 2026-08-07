import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    await sql`UPDATE jobs SET is_taken = true WHERE id = ${id}`;

    return NextResponse.json({ success: true, message: 'Job marked as taken' });
  } catch (error: any) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
