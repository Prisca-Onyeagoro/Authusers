import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/Usermodel';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await connect();
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: 'field is empty' }, { status: 400 })
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify(
          { message: 'user not found use the signup link' },
          { status: 400 }
        )
      );
    }

    const passwordCorrect = await bcryptjs.compare(password, user.password);

    if (!passwordCorrect) {
      return new NextResponse(
        JSON.stringify(
          {
            message: 'Incorrect password or email try and login again',
          },
          { status: 400 }
        )
      );
    }

    // create tokenData for the user
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    //   create token for the user
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const response = new NextResponse(
      JSON.stringify({ message: 'login successfully', success: true })
    );
    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message, status: 500 })
    );
  }
}
