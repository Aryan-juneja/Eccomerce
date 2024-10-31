import TransactionModel from "../../../../models/transaction.model";
import dbConnect from '../../../../utility/dbconnection';
import {authOptions} from '../../../api/auth/[...nextauth]/options'
import userModel from "../../../../models/user.model";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
export async function POST(request){
    const { paymentId, amount} = await request.json();
    const session = await getServerSession(authOptions); // Pass your authOptions here
    const user = session?.user._id;
    console.log(user)
    try {
        await dbConnect();
        if (!user || !mongoose.Types.ObjectId.isValid(user)) {
            const userId = await userModel.findOne({googleid:user});
            const order = await TransactionModel.create({
                paymentId:paymentId,
                amount:amount,
                user: userId._id // Ensure user ID is correctly passed
              });
          
              if (!order) {
                throw new Error("Failed to create order");
              }
          
              // Return success response if order creation is successful
              return new Response(JSON.stringify({ message: "transaction  created successfully", success: true }), { status: 200 });
        }
    
        // Connect to the database
        
        
        // Create a new order using the OrderModel
        const order = await TransactionModel.create({
            paymentId:paymentId,
            amount:amount,
          user: user // Ensure user ID is correctly passed
        });
    
        if (!order) {
          throw new Error("Failed to create transaction");
        }
    
        // Return success response if order creation is successful
        return new Response(JSON.stringify({ message: "transaction created successfully", success: true }), { status: 200 });
      } catch (error) {
        console.error('Error creating transaction:', error);
    
        // Return an appropriate error response based on the type of error
        return new Response(JSON.stringify({ message: "Failed to create transaction", success: false }), { status: 500 });
      }
}