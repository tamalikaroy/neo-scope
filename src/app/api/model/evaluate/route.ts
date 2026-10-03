import { NextResponse } from 'next/server';
import { evaluateNeoFeatures, MLFeatureInput } from '../../../../lib/mlModel';

export async function POST(request: Request) {
  try {
    const body: MLFeatureInput = await request.json();
    const result = evaluateNeoFeatures(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Model evaluation failed' },
      { status: 400 }
    );
  }
}
