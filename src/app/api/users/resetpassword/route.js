import generateRandomFig from '@/OTP';
import { connect } from '@/dbConfig/dbConfig';
import auth from '@/models/Usermodel';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connect();
  try {
    const { email } = await request.json();

    // check if this email exist in the database
    const userexist = await auth.findOne({ email });
    if (!userexist) {
      return new NextResponse(
        JSON.stringify({
          message: 'This email is not registered',
          status: 404,
        })
      );
    }

    // send the OTP to the user email

    return new NextResponse(
      JSON.stringify({ message: 'success', status: 200 })
    );
  } catch (error) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: 'error ----->' + error.message, status: 500 })
    );
  }
}
