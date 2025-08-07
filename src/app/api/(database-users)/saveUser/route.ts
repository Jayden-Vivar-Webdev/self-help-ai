import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect'
import User from '@/app/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  try {
    const existing = await User.findOne({ uid: body.uid });

    if (!existing) {
      const user = await User.create(body);
      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json({ success: true, message: 'User already exists' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error });
  }
}
