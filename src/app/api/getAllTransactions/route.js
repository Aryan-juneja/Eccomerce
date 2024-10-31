import TransactionModel from '../../../models/transaction.model';
import dbConnect from '../../../utility/dbconnection';

export async function GET(request) {
    try {
        await dbConnect();
        const orders = await TransactionModel.find();
        if (!orders || orders.length === 0) {
            return new Response(JSON.stringify({ message: "No result found" }), { status: 401 });
        }
        return new Response(JSON.stringify(orders), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error finding transactions" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
