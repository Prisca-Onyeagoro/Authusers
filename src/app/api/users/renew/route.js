import { connect } from '@/dbConfig/dbConfig';

import auth from '@/models/Usermodel';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request) {
  await connect();
  try {
    const { email, password } = await request.json();
    console.log(password, email);
    if (!password || !email) {
      return new NextResponse(
        JSON.stringify({ message: 'field must not be empty' })
      );
    }

    // rehash the existing users password
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    const userexist = await auth.findOne({ email: email });
    console.log(userexist._id);

    if (!userexist) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }));
    }
    const userId = userexist._id;
    const user = await auth.findByIdAndUpdate(
      { _id: userId },
      {
        password: hashedpassword,
      },
      { new: true }
    );
    console.log(user);

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

// import { connect } from '@/dbConfig/dbConfig';
// import auth from '@/models/Usermodel';
// import bcryptjs from 'bcryptjs';

// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   await connect();
//   try {
//     const { email, password } = await request.json();
//     console.log(password, email);

//   } catch (error) {
//     console.log(error.message);
//     return new NextResponse(JSON.stringify('error occurred: server error'));
//   }
// }
