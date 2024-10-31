import UserModel from '../../../models/user.model';
import dbConnect from '../../../utility/dbconnection';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  try {
    const { id, name, email, password } = await req.json();

    // Hash the password if provided
    let updatedFields = { name, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id, // Replace with actual userId from session
      updatedFields, // Conditionally update fields
      { new: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating user data' }), { status: 500 });
  }
}
