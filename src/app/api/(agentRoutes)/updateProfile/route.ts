// pages/api/updateProfile.ts
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import { verifyUserUid } from '@/app/lib/helpers/api/verifyUid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

   //Get authentication from current user from firebase func
   const uid = await verifyUserUid(request)

   if(!uid){
     return NextResponse.json({ error: 'Unauthorized: No valid UID' }, { status: 401 })
   }
  
  const {field, value } = await request.json();
  // Convert first letter of the field to lowercase
  const formattedField = field.charAt(0).toLowerCase() + field.slice(1);

  try {
    await dbConnect();
    await User.updateOne({ uid }, { $set: { [formattedField]: value } });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update', { status: 500 });
  }
}
