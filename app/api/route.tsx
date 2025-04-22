import { NextResponse } from 'next/server';

const TOMORROW_API_KEY = process.env.TOMORROW_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  if (!query) return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });

  try {
    const response = await fetch(
      `https://api.tomorrow.io/v4/geocode?query=${encodeURIComponent(query)}&apikey=${TOMORROW_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}