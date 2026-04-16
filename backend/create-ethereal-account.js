const nodemailer = require('nodemailer');

async function createEtherealTestAccount() {
  console.log('Creating Ethereal test account...');
  
  // Create test account
  const testAccount = await nodemailer.createTestAccount();
  
  console.log('\n========================================');
  console.log('📧 Ethereal Email Test Account Created');
  console.log('========================================');
  console.log('Username:', testAccount.user);
  console.log('Password:', testAccount.pass);
  console.log('\n⚠️ Add these to your .env file:');
  console.log('SMTP_USER=' + testAccount.user);
  console.log('SMTP_PASS=' + testAccount.pass);
  console.log('\n📬 View received emails at: https://ethereal.email');
  console.log('========================================\n');
}

createEtherealTestAccount().catch(console.error);
