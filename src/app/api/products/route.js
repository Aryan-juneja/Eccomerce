import OrderModel from '../../../models/order.model'
import dbConnect from '../../../utility/dbconnection'
export async function GET(response){
    try {
        await dbConnect();
        const orders = await OrderModel.aggregate([
            { "$unwind": "$orderItems" },
            { "$match": { "orderItems.name": { "$exists": true } } },
            { 
              "$addFields": { 
                "orderItems.normalizedName": { 
                  "$toLower": { "$trim": { "input": "$orderItems.name", "chars": "'\"" } }
                }
              }
            },
            { 
              "$group": { 
                "_id": { 
                  "product": "$orderItems.normalizedName", 
                  "orderId": "$_id" 
                } 
              } 
            },
            { 
              "$group": { 
                "_id": "$_id.product", 
                "count": { "$sum": 1 } 
              } 
            },
            { 
              "$project": {
                "_id": 0,
                "product": "$_id",
                "orders": "$count"
              }
            }
          ]
          );
          if(!orders) 
            return new Response(JSON.stringify({ message: "error finding orders" }), { status: 400 });
          return new Response(JSON.stringify({ message: "Orders Fetched successfully", orders }), { status: 201 });
        } catch (e) {
            return new Response(JSON.stringify({ message: "Orders fetching product" }), { status: 400 });
    }
}