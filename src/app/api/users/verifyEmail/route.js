import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

export async function POST(request) {
  connect();
  try {
  } catch (error) {
    return NextResponse(
      JSON.stringify({
        message: 'an error has occurred:-->' + error.message,
        status: 500,
      })
    );
  }
}
