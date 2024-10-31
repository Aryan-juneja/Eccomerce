import { sendMail } from '../../../utility/contactVerificationEmail';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        console.log(body);

        if (!body) {
            return NextResponse.json(
                { success: false, message: "Body is not defined" },
                { status: 400 }
            );
        }

        const response = await sendMail(body);

        if (!response) {
            return NextResponse.json(
                { success: false, message: "Error sending email" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json(
            { success: false, message: "Process Failed" },
            { status: 500 }
        );
    }
}
