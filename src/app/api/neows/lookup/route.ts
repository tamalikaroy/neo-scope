import { NextResponse } from 'next/server';
import { lookupNeoById } from '../../../../lib/nasaApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing object ID' }, { status: 400 });
  }

  try {
    const neo = await lookupNeoById(id);
    if (!neo) {
      return NextResponse.json({ error: 'Object not found' }, { status: 404 });
    }
    return NextResponse.json(neo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
