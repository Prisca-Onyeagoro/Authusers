import { connect } from '@/dbConfig/dbConfig';
import { sendEmail } from '@/helpers/mailers';
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
          status: 400,
        })
      );
    }

    await sendEmail({ email, emailType: 'RESET', userId: userexist._id });

    return new NextResponse(
      JSON.stringify({
        message: 'Check your email for verification',
        status: 200,
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'server error', status: 400 })
    );
  }
}
