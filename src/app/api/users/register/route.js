import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/Usermodel';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request) {
  await connect();
  try {
    const { name, email, contact, password } = await request.json();
    // check for empty fields
    if (!name || !email || !contact || !password) {
      return new NextResponse(
        JSON.stringify({ message: 'fill up the empty fields', status: 400 })
      );
    }
    //   check if user already exist
    const user = await User.findOne({ email: email });
    if (user) {
      return new NextResponse(
        JSON.stringify({ message: 'user already exists', status: 400 })
      );
    }
    //   hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    //   now we create the user
    const newUser = new User({
      name,
      email,
      contact,
      password: hashedpassword,
    });
    const savedUser = await newUser.save();
    return NextResponse.json(
      { message: 'user successfully created', savedUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message, status: 500 })
    );
  }
}
