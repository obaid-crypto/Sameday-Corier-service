const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Setup Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify Email Connection
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email configuration error:', error.message);
    } else {
        console.log('✅ Email service ready');
    }
});

// Test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'SameTime Indus Courier API Running',
        timestamp: new Date().toISOString()
    });
});

// CONTACT FORM ENDPOINT
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields (Name, Email, Message)'
            });
        }

        // Email to Business
        const mailToYou = {
            from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
            to: process.env.BUSINESS_EMAIL,
            subject: `New Contact: ${subject || 'No Subject'}`,
            replyTo: email,
            html: `
                <h2>New Message from Customer</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>Sent at: ${new Date().toLocaleString()}</em></p>
            `,
        };

        // Email to Customer (Auto Reply)
        const mailToCustomer = {
            from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Thank You - ${process.env.COMPANY_NAME}`,
            html: `
                <h2>Hello ${name},</h2>
                <p>Thank you for contacting <strong>${process.env.COMPANY_NAME}</strong>.</p>
                <p>We have received your message and will get back to you within 24 hours.</p>
                
                <h3>Your Message Details:</h3>
                <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                
                <hr>
                <h3>Contact Us Directly:</h3>
                <p>📞 Phone: ${process.env.PHONE_NUMBER}</p>
                <p>💬 WhatsApp: ${process.env.WHATSAPP_NUMBER}</p>
                <p>📧 Email: ${process.env.BUSINESS_EMAIL}</p>
                
                <hr>
                <p>Best regards,<br><strong>${process.env.COMPANY_NAME} Team</strong></p>
            `,
        };

        // Send both emails
        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToCustomer);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! Check your email for confirmation.',
        });

    } catch (error) {
        console.error('Email error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again or contact us directly.',
        });
    }
});

// SHIPMENT FORM ENDPOINT (Optional)
app.post('/api/shipment', async (req, res) => {
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
                message: 'Please fill all required fields',
            });
        }

        // Email to business
        const mailToYou = {
            from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
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
                <hr>
                <p>⏰ <strong>Please contact the customer as soon as possible.</strong></p>
            `,
        };

        // Email to customer
        const mailToCustomer = {
            from: `"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,
            to: senderEmail,
            subject: `Shipment Request Received - ${process.env.COMPANY_NAME}`,
            html: `
                <h2>Hello ${senderName},</h2>
                <p>Your shipment request has been received successfully!</p>
                <p>Our team will contact you shortly at <strong>${senderPhone}</strong> to confirm the details and provide a quote.</p>
                
                <h3>Your Shipment Summary:</h3>
                <p><strong>Recipient:</strong> ${recipientName}</p>
                <p><strong>Service:</strong> ${serviceType}</p>
                <p><strong>Weight:</strong> ${weight} kg</p>
                
                <hr>
                <h3>Quick Contact Options:</h3>
                <p>📞 <strong>Call:</strong> ${process.env.PHONE_NUMBER}</p>
                <p>💬 <strong>WhatsApp:</strong> ${process.env.WHATSAPP_NUMBER}</p>
                <hr>
                <p>Best regards,<br><strong>${process.env.COMPANY_NAME}</strong></p>
            `,
        };

        await transporter.sendMail(mailToYou);
        await transporter.sendMail(mailToCustomer);

        res.status(200).json({
            success: true,
            message: 'Shipment request submitted! We will contact you soon.',
        });

    } catch (error) {
        console.error('Shipment error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to submit shipment request',
        });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email: ${process.env.EMAIL_USER}`);
    console.log(`🌐 CORS Origin: ${process.env.CLIENT_URL}`);
});