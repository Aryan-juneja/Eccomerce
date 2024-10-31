import dbConnect from '../../../utility/dbconnection';
import userModel from '../../../models/user.model';
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../../utility/emailverification";

export async function POST(request) {
    const { name, email, password } = await request.json();

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
        // Connect to the database
        await dbConnect();

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User already exists",
                }),
                { status: 400 }
            );
        }

        // Generate verification code
        let verifycode = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user
        const newUser = new userModel({ name, email, password: hash, verifycode });
        const savedUser = await newUser.save();

        // Check if the user was successfully saved
        if (!savedUser) {
            return new Response(
                JSON.stringify({ success: false, message: "Failed to save user" }),
                { status: 500 }
            );
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, verifycode, name);
        if (!emailResponse) {
            return new Response(
                JSON.stringify({ success: false, message: "Failed to send verification email" }),
                { status: 500 }
            );
        }

        // Return success response
        return new Response(
            JSON.stringify({ success: true, message: "User created successfully" }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Failed to create user" }),
            { status: 500 }
        );
    }
}
