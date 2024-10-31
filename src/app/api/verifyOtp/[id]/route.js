import userModel from '../../../../models/user.model';
import dbConnect from '../../../../utility/dbconnection';

export async function POST(request, { params }) {
    const id = params.id;
    const { otp } = await request.json();
    console.log("otp", otp, id);

    try {
        await dbConnect();

        const user = await userModel.findById(id);
        console.log(user);

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        if (user.verifycode !== otp) {
            return new Response(JSON.stringify({ message: "Code doesn't match" }), { status: 401 });
        }

        user.verifycode = null;
        user.verifystatus = true;
        await user.save();

        return new Response(JSON.stringify({ message: "Verified Successfully" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error Verifying User" }), { status: 500 });
    }
}
