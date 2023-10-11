import { connect } from '@/dbConfig/dbConfig';

import auth from '@/models/Usermodel';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request) {
  await connect();
  try {
    const { email, password } = await request.json();

    if (!password || !email) {
      return new NextResponse(
        JSON.stringify({ message: 'field must not be empty', status: 400 })
      );
    }

    // rehash the existing users password
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    const userexist = await auth.findOne({ email: email });

    if (!userexist) {
      return new NextResponse(
        JSON.stringify({ message: 'User not found', status: 400 })
      );
    }
    const userId = userexist._id;

    await auth.findByIdAndUpdate(
      { _id: userId },
      {
        password: hashedpassword,
      },
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({ message: 'Password Sucessfully Reset', status: 200 })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'server error', status: 500 })
    );
  }
}
