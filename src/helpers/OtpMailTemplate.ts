export const MailTemplate = (
  name: string,
  verificationLink: string
): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification - KNOWVIOFIT</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f8f8f8;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #333;
      }
      .content {
        padding: 20px 0;
      }
      .otp {
        background-color: #00bc69;
        color: #fff;
        font-size: 32px;
        text-align: center;
        padding: 10px;
        margin: 20px auto;
        width: fit-content;
        border-radius: 4px;
      }
      .btn {
        display: inline-block;
        background-color: #00bc69;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 20px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #aaa;
        padding-top: 10px;
        border-top: 1px solid #ddd;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>KNOWVIOFIT</h1>
      </div>
      <div class="content">
        <p>Dear ${name},</p>
        <p>We received a sign-Up request for your KNOWVIOFIT account. Please verify your email:</p>
        <p>This Verification is valid for 3 minutes. If you did not initiate this request, please disregard this email.</p>
        <p>Verify your account by clicking the link below:</p>
        <p style="text-align:center;">
          <a class="btn" href="${verificationLink}">Verify Your Account</a>
        </p>
        <p>Thank you,<br/>The KNOWVIOFIT Team</p>
      </div>
      <div class="footer">
        <p>This is an automated email. Please do not reply.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
