import { NextResponse } from 'next/server';
import { fetchLiveNeoFeed } from '../../../../lib/nasaApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('start_date') || undefined;
  const endDate = searchParams.get('end_date') || undefined;

  try {
    const result = await fetchLiveNeoFeed(startDate, endDate);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
