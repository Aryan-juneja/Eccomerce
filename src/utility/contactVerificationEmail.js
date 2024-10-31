import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
    port: 465,
    auth: {
        user: "theprofessorsergio8@gmail.com", // Your email address
        pass: "jdkimiwfwvhaumhm" // Your email password or app-specific password
    }
});
export const sendMail = async ({email,subject,message}) => {
    
    const html = `<p>${message}</p>`;
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: message,
            html: html
        });

        if (!info) return { success: false, message: 'Failed to send Contact Email.' };
        
            return { success: true, message: 'Email SEND SUCCESSFULLY.' };  
          } catch (error) {
            console.error('Error sending  email:', error);
            return { success: false, message: 'ERROR SENDING Email.' };
    }
};
