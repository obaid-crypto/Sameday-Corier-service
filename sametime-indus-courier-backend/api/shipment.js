const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const {
            senderName,
            senderEmail,
            senderPhone,
            senderAddress,
            recipientName,
            recipientPhone,
            recipientAddress,
            serviceType,
            weight,
            description,
        } = req.body;

        if (!senderName || !senderEmail || !recipientName || !recipientPhone) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }

        const mailToYou = {
            from: process.env.EMAIL_USER,
            to: process.env.BUSINESS_EMAIL,
            subject: `New Shipment Request from ${senderName}`,
            replyTo: senderEmail,
            html: `
                <h2>📦 New Shipment Request</h2>
                <p><strong>Name:</strong> ${senderName}</p>
                <p><strong>Email:</strong> ${senderEmail}</p>
                <p><strong>Service:</strong> ${serviceType}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
            `,
        };

        const mailToCustomer = {
            from: process.env.EMAIL_USER,
            to: senderEmail,
            subject: `Shipment Received - SameTime Indus Courier`,
            html: `
                <h2>Hello ${senderName},</h2>
                <p>Your shipment request received!</p>
                <p>We will contact you soon.</p>
                <hr>
                <p>Best regards,<br><strong>SameTime Indus Courier</strong></p>
            `,
        };

        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToCustomer);

        return res.status(200).json({
            success: true,
            message: 'Shipment request submitted!'
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to submit shipment request'
        });
    }
};