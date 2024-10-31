import ProductModel from '../../../../models/products.model';
import dbConnect from '../../../../utility/dbconnection';

export async function POST(request,{params}) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    // Parse the request URL to get the product ID
    const id =params.id;

    // Check if the ID is provided
    if (!id) {
      return new Response(JSON.stringify({ message: "Product ID is required", success: false }), { status: 400 });
    }

    // Find and delete the product by ID
    const product = await ProductModel.findByIdAndDelete(id);

    // If the product does not exist, return an error response
    if (!product) {
      return new Response(JSON.stringify({ message: "No result found to be deleted", success: false }), { status: 404 });
    }

    // Return a success response
    return new Response(JSON.stringify({ message: "Product deleted successfully", success: true }), { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the delete process
    console.error(error);
    return new Response(JSON.stringify({ message: "Product deletion unsuccessful", success: false }), { status: 500 });
  }
}
