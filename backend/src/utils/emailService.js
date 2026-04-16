const nodemailer = require('nodemailer');

class EmailService {
  static async sendOrderConfirmation(order, customerEmail) {
    try {
      // Check if SMTP is configured
      if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com') {
        console.log('⚠️ Email not sent: SMTP not configured. Please set up SMTP credentials in .env file');
        console.log('📧 Order confirmation would be sent to:', customerEmail || process.env.TEST_EMAIL);
        console.log('📧 Order ID:', order.id);
        console.log('📧 Total Amount: ₹' + parseFloat(order.totalPrice).toFixed(2));
        return { success: false, error: 'SMTP not configured' };
      }

      // Create transporter (using Ethereal for testing, or use your SMTP)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER || 'your-email@gmail.com',
          pass: process.env.SMTP_PASS || 'your-app-password'
        }
      });

      // Use customer email if provided, otherwise fallback to TEST_EMAIL
      const recipientEmail = customerEmail || process.env.TEST_EMAIL || 'customer@example.com';

      const mailOptions = {
        from: '"Amazon Clone" <noreply@amazonclone.com>',
        to: recipientEmail,
        subject: `Order Confirmation - Order #${order.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #131921; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">amazon.clone</h1>
            </div>
            
            <div style="padding: 20px; background-color: #f3f3f3;">
              <h2 style="color: #131921;">Order Confirmed!</h2>
              <p style="font-size: 16px;">Thank you for your order.</p>
              
              <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #131921; margin-top: 0;">Order Details</h3>
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> ₹${parseFloat(order.total_amount).toFixed(2)}</p>
                <p><strong>Status:</strong> ${order.status}</p>
              </div>

              <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #131921; margin-top: 0;">Shipping Address</h3>
                <p>${order.shipping_address}</p>
              </div>

              <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #131921; margin-top: 0;">Items Ordered</h3>
                ${order.items.map(item => `
                  <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                    <p style="margin: 5px 0;"><strong>${item.name}</strong></p>
                    <p style="margin: 5px 0;">Quantity: ${item.quantity}</p>
                    <p style="margin: 5px 0;">Price: ₹${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                `).join('')}
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="http://localhost:3000/order-confirmation/${order.id}" 
                   style="background-color: #ffd814; color: #000; padding: 12px 30px; 
                          text-decoration: none; border-radius: 8px; font-weight: bold;">
                  View Order Details
                </a>
              </div>
            </div>

            <div style="background-color: #131921; color: white; padding: 20px; text-align: center; font-size: 12px;">
              <p>&copy; 2026 Amazon.clone - SDE Intern Assignment</p>
              <p>This is a demo project for educational purposes.</p>
            </div>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      // Don't throw error - order should still succeed even if email fails
      return { success: false, error: error.message };
    }
  }
}

module.exports = EmailService;
