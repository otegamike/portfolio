import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const RecipientEmail = process.env.RECIPIENT_EMAIL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendPortfolioEmail( 
    name : string, 
    email: string, 
    message: string ) : Promise<{ sent: boolean }> {

    console.log("Sending Email...")
    try {
        await transporter.sendMail({
            from: `"Shopperific" <${process.env.EMAIL_USER}>`,
            to: `${RecipientEmail}`,
            subject: "New message from your portfolio",
            text:`New message from your portfolio.
             Name: ${name}
             Email: ${email}
             Message: ${message}  `
            ,
            html: `
                <div style="font-family: Arial, sans-serif;">
                <h2>New message from your portfolio</h2>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>
                </div> 
            `
        });

        console.log("Email sent");

        return { sent: true }

    } catch ( err: any ) {
        console.error(err.message, err);
        return { sent: false }
    }
}