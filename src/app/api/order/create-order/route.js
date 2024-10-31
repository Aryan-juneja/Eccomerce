import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options'; // Adjust the path to your authOptions
import OrderModel from '../../../../models/order.model';
import dbConnect from '../../../../utility/dbconnection';
import userModel from '../../../../models/user.model';
import mongoose from 'mongoose';
export async function POST(request) {
  try {
    // Extract data from the request body
    const { orderItems, addressInfo, totalPrice } = await request.json();
    const { address, city, pincode, country, phoneNumber } = addressInfo;

    // Get user session
    const session = await getServerSession(authOptions); // Pass your authOptions here
    const user = session?.user._id;
    await dbConnect();

    if (!user || !mongoose.Types.ObjectId.isValid(user)) {
        const userId = await userModel.findOne({googleid:user});
        const order = await OrderModel.create({
            orderItems: orderItems.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              salePrice: item.salePrice
            })),
            shippingAddress1: address,
            city: city,
            zip: pincode,
            country: country,
            phone: phoneNumber,
            totalPrice: totalPrice,
            user: userId._id // Ensure user ID is correctly passed
          });
      
          if (!order) {
            throw new Error("Failed to create order");
          }
      
          // Return success response if order creation is successful
          return new Response(JSON.stringify({ message: "Order created successfully", success: true }), { status: 200 });
    }

    // Connect to the database
    
    
    // Create a new order using the OrderModel
    const order = await OrderModel.create({
      orderItems: orderItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        salePrice: item.salePrice
      })),
      shippingAddress1: address,
      city: city,
      zip: pincode,
      country: country,
      phone: phoneNumber,
      totalPrice: totalPrice,
      user: user // Ensure user ID is correctly passed
    });

    if (!order) {
      throw new Error("Failed to create order");
    }

    // Return success response if order creation is successful
    return new Response(JSON.stringify({ message: "Order created successfully", success: true }), { status: 200 });
  } catch (error) {
    console.error('Error creating order:', error);

    // Return an appropriate error response based on the type of error
    return new Response(JSON.stringify({ message: "Failed to create order", success: false }), { status: 500 });
  }
}
