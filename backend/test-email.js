const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***configured***' : 'NOT SET');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection successful!');

    // Send test email
    const testMail = await transporter.sendMail({
      from: `"Amazon Clone Test" <${process.env.SMTP_USER}>`,
      to: process.env.TEST_EMAIL || process.env.SMTP_USER,
      subject: 'Test Email from Amazon Clone',
      html: `
        <h2>Email Configuration Test Successful!</h2>
        <p>If you're seeing this, your Gmail app password is working correctly.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    console.log('✓ Test email sent successfully!');
    console.log('Message ID:', testMail.messageId);
    console.log('\nCheck your inbox (and spam folder) at:', process.env.TEST_EMAIL || process.env.SMTP_USER);
    
  } catch (error) {
    console.error('✗ Email test failed!');
    console.error('Error:', error.message);
    console.error('\nCommon issues:');
    console.error('1. Make sure you restarted the backend server after updating .env');
    console.error('2. Check if the app password is correct (no spaces)');
    console.error('3. Verify that 2-Step Verification is enabled on your Gmail account');
    console.error('4. Check if "Less secure app access" or "App passwords" is enabled');
  }
}

testEmail();
