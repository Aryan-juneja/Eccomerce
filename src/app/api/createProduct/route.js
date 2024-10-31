import ProductModel from '../../../models/products.model';
import dbConnect from '../../../utility/dbconnection';

export async function POST(request) {
    try {
        // Parse the request body to get the product details
        const { name, price, stock, imageUrl, onSale, salePrice,purchasePrice } = await request.json();
        console.log(name, price, stock, imageUrl, onSale, salePrice,purchasePrice);
        

        // Validate the request data
        if (![name, price, stock, imageUrl, onSale, salePrice,purchasePrice].every(field => field !== undefined && field !== null && field !== "")) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }

        // Ensure the database connection is established
        await dbConnect();

        // Create a new product instance
        const product = new ProductModel({ name, price, stock, imageUrl, onSale, salePrice,purchasePrice });

        // Save the product to the database
        await product.save();

        // Return a success response
        return new Response(JSON.stringify({ message: "Product created successfully", product }), { status: 201 });
    } catch (error) {
        // Handle any errors that occur during the save process
        console.error(error);
        return new Response(JSON.stringify({ message: "Error creating product" }), { status: 500 });
    }
}
