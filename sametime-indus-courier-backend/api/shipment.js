const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default async (req, res) => {
    // Allow CORS
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
                <h3>Sender Details:</h3>
                <p><strong>Name:</strong> ${senderName}</p>
                <p><strong>Email:</strong> ${senderEmail}</p>
                <p><strong>Phone:</strong> ${senderPhone}</p>
                <p><strong>Address:</strong> ${senderAddress}</p>
                
                <h3>Recipient Details:</h3>
                <p><strong>Name:</strong> ${recipientName}</p>
                <p><strong>Phone:</strong> ${recipientPhone}</p>
                <p><strong>Address:</strong> ${recipientAddress}</p>
                
                <h3>Shipment Details:</h3>
                <p><strong>Service:</strong> ${serviceType}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Description:</strong> ${description || 'N/A'}</p>
            `,
        };

        const mailToCustomer = {
            from: process.env.EMAIL_USER,
            to: senderEmail,
            subject: `Shipment Request Received - SameTime Indus Courier`,
            html: `
                <h2>Hello ${senderName},</h2>
                <p>Your shipment request has been received successfully!</p>
                <p>Our team will contact you shortly at <strong>${senderPhone}</strong>.</p>
                
                <h3>Shipment Summary:</h3>
                <p><strong>Recipient:</strong> ${recipientName}</p>
                <p><strong>Service:</strong> ${serviceType}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                
                <hr>
                <p>Best regards,<br><strong>SameTime Indus Courier</strong></p>
            `,
        };

        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToCustomer);

        return res.status(200).json({
            success: true,
            message: 'Shipment request submitted! We will contact you soon.'
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to submit shipment request'
        });
    }
};