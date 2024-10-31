import ProductModel from '../../../models/products.model';
import dbConnect from '../../../utility/dbconnection';

export async function GET(request) {
    try {
        await dbConnect();
        const products = await ProductModel.find({ onSale: true });
        if (!products || products.length === 0) {
            return new Response(JSON.stringify({ message: "No result found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error finding products" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
