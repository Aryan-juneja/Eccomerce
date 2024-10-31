import nodemailer from 'nodemailer'
export async function sendVerificationEmail(email,verifycode,name){
    console.log(email)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
            port: 465,
            auth: {
                user: process.env.EMAIL_KEY, // Your email address
                pass: process.env.EMAIL_PASSWORD_KEY // Your email password or app-specific password
            },
        }); 
        const mailOptions = {
            from: 'theprofessorsergio8@gmail.com', // sender address
            to: email, // list of receivers
            subject: ' Verification Code', // Subject line
            html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
                <title>Verification Code</title>
                <style>
                  @font-face {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    mso-font-alt: 'Verdana';
                    src: url('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
                  }
          
                  * {
                    font-family: 'Roboto', Verdana;
                  }
                </style>
              </head>
              <body>
                <div>
                  <h2>Hello, ${name},</h2>
                  <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
                  <p>${verifycode}</p>
                  <p>If you did not request this code, please ignore this email.</p>
                </div>
              </body>
              </html>
            `,
          };
          const mailResponse = await transporter.sendMail(mailOptions);
          return { success: true, message: 'Verification email sent successfully.' };
    } catch (error) {
        console.error('Error sending verification email:', error);
    return { success: false, message: 'Failed to send verification email.' };
    }
}





