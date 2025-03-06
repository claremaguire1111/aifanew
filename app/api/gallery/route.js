import { NextResponse } from 'next/server';

let userFilms = []; // For demo, store films in memory

export async function GET() {
  return NextResponse.json({ films: userFilms });
}

export async function POST(req) {
  try {
    const { filmUrl, title, group } = await req.json();
    userFilms.push({ url: filmUrl, title, group });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in /api/gallery POST:', err);
    return NextResponse.json({ error: 'Failed to save film' }, { status: 500 });
  }
}
