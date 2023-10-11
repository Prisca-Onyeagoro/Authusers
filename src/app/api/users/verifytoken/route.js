import { connect } from '@/dbConfig/dbConfig';
import auth from '@/models/Usermodel';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connect();

  try {
    const { token } = await request.json();

    const user = await auth.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'invalid token', status: 'error' })
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return new NextResponse(
      JSON.stringify({ message: 'Successfully verified' })
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'server error' }));
  }
}
