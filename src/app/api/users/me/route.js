import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import auth from '@/models/Usermodel';
import { connect } from '@/dbConfig/dbConfig';

export async function GET(request) {
  await connect();
  try {
    const userId = await getDataFromToken(request);
    const user = await auth.findOne({ _id: userId }).select('-password');

    return new NextResponse(
      JSON.stringify({ message: 'user found', data: user })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
