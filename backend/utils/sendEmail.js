// utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderReadyEmail = async (userEmail, userName, orderItems, totalAmount) => {
  const itemsList = orderItems
    .map((item) => `<tr>
      <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">&#8377;${item.price * item.quantity}</td>
    </tr>`)
    .join('');

  const mailOptions = {
    from: `"KDK Canteen" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: '🍽️ Your Order is Ready for Pickup!',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px;border-radius:10px;">
        <div style="background:linear-gradient(135deg,#FF6B35,#e55a24);padding:30px;border-radius:10px;text-align:center;">
          <h1 style="color:white;margin:0;font-size:28px;">🍽️ Order Ready!</h1>
          <p style="color:white;margin:10px 0 0;font-size:16px;">Your food is ready for pickup</p>
        </div>
        <div style="background:white;padding:30px;border-radius:10px;margin-top:20px;">
          <h2 style="color:#333;">Hi ${userName}! 👋</h2>
          <p style="color:#666;font-size:16px;">Great news! Your order is <strong style="color:#FF6B35;">ready for pickup</strong> at the KDK College Canteen counter.</p>
          <h3 style="color:#333;border-bottom:2px solid #FF6B35;padding-bottom:10px;">Order Summary</h3>
          <table style="width:100%;border-collapse:collapse;margin-top:10px;">
            <thead>
              <tr style="background:#FF6B35;color:white;">
                <th style="padding:10px;text-align:left;">Item</th>
                <th style="padding:10px;text-align:center;">Qty</th>
                <th style="padding:10px;text-align:right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsList}</tbody>
            <tfoot>
              <tr style="background:#f5f5f5;font-weight:bold;">
                <td colspan="2" style="padding:10px;border:1px solid #ddd;">Total</td>
                <td style="padding:10px;border:1px solid #ddd;text-align:right;">&#8377;${totalAmount}</td>
              </tr>
            </tfoot>
          </table>
          <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:15px;margin-top:20px;">
            <p style="margin:0;color:#856404;font-size:15px;">📍 <strong>Please collect your order from the canteen counter.</strong></p>
          </div>
          <p style="color:#999;font-size:13px;margin-top:20px;text-align:center;">Thank you for ordering from KDK College Canteen! 🙏</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderReadyEmail };
