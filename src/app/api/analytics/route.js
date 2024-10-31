import ProductModel from '../../../models/products.model';
import dbConnect from '../../../utility/dbconnection'
export async function GET(response){
    try {
        await dbConnect();
        const orders = await ProductModel.aggregate([
            {
              "$project": {
                "product": "$name",
                "profit": {
                  "$cond": {
                    "if": { "$eq": ["$onSale", true] },
                    "then": { "$subtract": ["$salePrice", "$purchasePrice"] },
                    "else": { "$subtract": ["$price", "$purchasePrice"] }
                  }
                }
              }
            },
            {
              "$project": {
                "_id": 0,
                "product": 1,
                "profit": 1
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