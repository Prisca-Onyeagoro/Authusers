import { connect } from '@/dbConfig/dbConfig';
import auth from '@/models/Usermodel';
import { NextResponse } from 'next/server';
import generateRandomFig from '@/OTP';

export async function POST(request) {
  await connect();
  try {
    const { email } = await request.json();
    //   check if user exist
    const user = await auth.findOne({ email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'wrong email address', status: 400 })
      );
    }

    // generate OTP code for the user
    const randOtp = generateRandomFig();
    let newOtp = '';

    randOtp.forEach((num) => {
      newOtp += num + ' ';
    });

    console.log(newOtp.trim());

    // save the OTP code to the user database
    await auth.findByIdAndUpdate(
      { _id: user._id },
      { contact: newOtp.trim() },
      { Otp: newOtp.trim() }
    );

    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: 'an error occurred', status: 500 })
    );
  }
}
