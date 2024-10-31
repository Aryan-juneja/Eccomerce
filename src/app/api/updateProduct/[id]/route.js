import ProductModel from '../../../../models/products.model';
import dbConnect from '../../../../utility/dbconnection';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  // Ensure the database connection is established
  await dbConnect();

  // Parse the request URL to get the product ID
  const id = params.id;

  // Parse the request body to get the product details
  const updatedProduct = await request.json();

  const { name, price, stock, imageUrl, onSale, salePrice } = updatedProduct;

  // Validate the request data
  if (!name || !price || !stock || !imageUrl || onSale === undefined || salePrice === undefined) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    // Find and update the product by ID
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { name, price, stock, imageUrl, onSale, salePrice },
      { new: true }
    );

    // If the product does not exist, return an error response
    if (!product) {
      return NextResponse.json({ message: "Product does not exist" }, { status: 404 });
    }

    // Return a success response
    return NextResponse.json({ message: "Product updated", product }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}
