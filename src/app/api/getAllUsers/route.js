import userModel from '../../../models/user.model';
import dbConnect from '../../../utility/dbconnection';

export async function GET(request) {
    try {
        await dbConnect();
        const users = await userModel.find();
        if (!users || users.length === 0) {
            return new Response(JSON.stringify({ message: "No result found" }), { status: 401 });
        }
        return new Response(JSON.stringify(users), { status: 200, headers: { 'Content-Type': 'application/json' } });
        
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error finding Users" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
