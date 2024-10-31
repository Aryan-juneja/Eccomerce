import { NextResponse } from 'next/server';
import userModel from '../../../../models/user.model';
import dbConnect from '../../../../utility/dbconnection';

export async function POST(request, { params }) {
  const { id } = params;
  const { role } = await request.json();

  try {
    await dbConnect();
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return NextResponse.json({ message: "User does not exist" }, { status: 404 });
    }

    return NextResponse.json({ message: "User role updated successfully", user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating user role" }, { status: 500 });
  }
}
