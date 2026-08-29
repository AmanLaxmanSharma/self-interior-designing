const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null; // Development mode fallback
  }

  if (host === 'smtp.gmail.com' || (user && user.endsWith('@gmail.com'))) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use STARTTLS on port 587
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      family: 4, // Force IPv4 to prevent cloud IPv6 connection timeouts on Render
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send Verification OTP Email
 * @param {string} toEmail - Recipient email
 * @param {string} otp - 6-digit verification code
 */
const sendOtpEmail = async (toEmail, otp) => {
  const companyName = process.env.COMPANY_NAME || 'Karoli Interior Hub';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F5F0E6; margin: 0; padding: 20px; color: #292A26; }
          .container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #E8DDCC; }
          .header { background: #3F5036; padding: 30px 20px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 12px; color: #E8DDCC; text-transform: uppercase; letter-spacing: 1px; }
          .body { padding: 35px 30px; text-align: center; }
          .body p { font-size: 14px; line-height: 1.6; color: #555; margin: 0 0 20px 0; }
          .otp-box { background: #F5F0E6; border: 2px dashed #3F5036; border-radius: 12px; padding: 18px 24px; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #3F5036; display: inline-block; margin: 10px 0 25px 0; }
          .footer { background: #FAF7F2; padding: 20px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #E8DDCC; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${companyName}</h1>
            <p>Account Verification</p>
          </div>
          <div class="body">
            <p>Thank you for signing up with <strong>${companyName}</strong>. Please use the verification code below to verify your email address and activate your account:</p>
            <div class="otp-box">${otp}</div>
            <p style="font-size: 12px; color: #888;">This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Resend HTTPS API (Works 100% on Render Free Tier without SMTP port block)
  if (process.env.RESEND_API_KEY) {
    try {
      const fromEmail = process.env.RESEND_FROM || 'Karoli Interior Hub <onboarding@resend.dev>';
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `${otp} is your verification code - ${companyName}`,
          html: htmlContent,
        }),
      });

      const resendData = await resendRes.json();
      if (resendRes.ok) {
        console.log(`[RESEND API SENT] OTP sent to ${toEmail}. ID: ${resendData.id}`);
        return { success: true, messageId: resendData.id };
      } else {
        console.error(`[RESEND API ERROR]:`, resendData);
      }
    } catch (apiErr) {
      console.error(`[RESEND API NETWORK ERROR]:`, apiErr.message);
    }
  }

  // 2. Nodemailer SMTP Transporter (Localhost / Non-blocked SMTP hosting)
  const transporter = createTransporter();

  if (!transporter) {
    console.log(`\n========================================`);
    console.log(`[EMAIL OTP DEV MODE]`);
    console.log(`To: ${toEmail}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`========================================\n`);
    return { success: true, mode: 'dev' };
  }

  const senderEmail = process.env.SMTP_USER || process.env.EMAIL_USER || 'no-reply@karoliinterior.com';
  const mailOptions = {
    from: `"${companyName}" <${senderEmail}>`,
    to: toEmail,
    subject: `${otp} is your verification code - ${companyName}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SENT] OTP successfully sent to ${toEmail}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`\n[EMAIL SMTP ERROR] Failed to send email via Gmail SMTP:`, err.message);
    console.log(`[EMAIL OTP FALLBACK CODE] For ${toEmail}: ${otp}`);
    if (err.message && err.message.includes('535')) {
      console.log(`💡 NOTE: Google requires a 16-character "App Password" (from Google Account -> Security -> 2-Step Verification -> App Passwords) instead of the standard account password.`);
    }
    console.log(`========================================\n`);
    throw new Error('Email delivery failed. ' + (err.message.includes('535') ? 'Gmail requires an App Password for SMTP authentication.' : err.message));
  }
};

module.exports = {
  sendOtpEmail,
};
