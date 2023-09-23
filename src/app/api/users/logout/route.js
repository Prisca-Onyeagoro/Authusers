import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = new NextResponse(
      JSON.stringify({ message: 'Logout successful', status: 200 })
    );
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message, status: 500 })
    );
  }
}
