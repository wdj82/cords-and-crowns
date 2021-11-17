import nodemailer from 'nodemailer';

export default async (req, res) => {
    try {
        // send email of order details
        const smtp = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const message = await smtp.sendMail({
            to: 'kc5uyn@gmail.com',
            from: process.env.EMAIL_FROM,
            subject: 'Testing Email Sends',
            text: `
            Thank you for your order! 
            `,
            html: `<div>You got this email woo</div>`,
        });
        console.log(message);
        console.log('order email sent');
    } catch (error) {
        console.error('ERROR sending order email:', error);
    }

    res.json({ message: 'success' });
};
