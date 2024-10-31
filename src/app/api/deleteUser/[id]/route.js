import userModel from '../../../../models/user.model';
import dbConnect from '../../../../utility/dbconnection';
export async function POST(request,{params}) {
  try {
    // Ensure the database connection is established
    await dbConnect();
    // Parse the request URL to get the product ID
    const id =params.id;
    // Check if the ID is provided
    if (!id) {
      return new Response(JSON.stringify({ message: "User ID is required", success: false }), { status: 400 });
    }
    // Find and delete the product by ID
    const user = await userModel.findByIdAndDelete(id);
    // If the product does not exist, return an error response
    if (!user) {
      return new Response(JSON.stringify({ message: "No result found to be deleted", success: false }), { status: 404 });
    }
    // Return a success response
    return new Response(JSON.stringify({ message: "User deleted successfully", success: true }), { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the delete process
    console.error(error);
    return new Response(JSON.stringify({ message: "User deletion unsuccessful", success: false }), { status: 500 });
  }
}
