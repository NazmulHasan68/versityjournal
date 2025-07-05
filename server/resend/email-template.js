export const verificationTokenEmailTemplate = `<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f7fb; color: #333;
    }
    .container {
      max-width: 600px; 
      margin: 0 auto; 
      background: #fff; 
      border-radius: 8px; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .top-bar {
      background-color: #0ea5e9; /* sky blue */
      height: 6px;
      width: 100%;
    }
    .header {
      text-align: center;
      padding: 30px 20px 10px;
      color: #0ea5e9;
      font-family: 'Georgia', serif;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 0.1em;
      user-select: none;
    }
    .subheader {
      text-align: center;
      color: #64748b;
      font-size: 14px;
      margin-top: -8px;
      margin-bottom: 30px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }
    .content {
      padding: 0 40px 40px;
      text-align: center;
    }
    .title {
      font-size: 22px;
      font-weight: 600;
      color: #1e293b; /* slate-800 */
      margin-bottom: 15px;
    }
    .text {
      font-size: 16px;
      color: #475569; /* slate-600 */
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .code {
      display: inline-block;
      font-size: 32px;
      font-weight: 700;
      color: #0ea5e9;
      background: #e0f2fe;
      padding: 18px 40px;
      border-radius: 8px;
      letter-spacing: 0.3em;
      user-select: text;
      box-shadow: 0 0 12px rgba(14, 165, 233, 0.3);
      margin-bottom: 10px;
    }
    .footer-text {
      font-size: 13px;
      color: #64748b;
      margin-top: 20px;
    }
    .footer-link {
      color: #0ea5e9;
      text-decoration: none;
    }
    .bottom {
      padding: 20px 40px 30px;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      user-select: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="top-bar"></div>
    <div class="header">Thesis Journal</div>
    <div class="subheader">Academic Research Platform</div>

    <div class="content">
      <div class="title">Verify Your Email Address</div>
      <div class="text">
        Thanks for signing up with Thesis Journal! To complete your registration, please verify your email by entering the following code:
      </div>
      <div class="code">{verificationToken}</div>
      <div class="footer-text">This code is valid for 10 minutes.</div>
      <div class="footer-text" style="margin-top: 30px;">
        If you didn’t request this, you can safely ignore this email.<br />
        Need help? Contact us at <a href="mailto:support@thesisjournal.com" class="footer-link">support@thesisjournal.com</a>
      </div>
    </div>

    <div class="bottom">
      &copy; ${new Date().getFullYear()} Thesis Journal. All rights reserved.<br />
      Dhaka, Bangladesh
    </div>
  </div>
</body>

</html>`;




export const WELCOME_EMAIL_TEMPLATE = `<html lang="en" dir="ltr">

<head>
  <meta charset="UTF-8" />
  <title>Welcome to Thesis Journal</title>
  <meta name="x-apple-disable-message-reformatting" />
  <style>
    body {
      background-color: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      color: #1e293b;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 0 48px;
      border: 1px solid #0ea5e933;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgb(14 165 233 / 0.1);
      background: #fff;
    }
    .top-bar {
      background-color: #0ea5e9; /* sky blue */
      height: 6px;
      width: 100%;
    }
    .header {
      font-family: 'Georgia', serif;
      font-size: 36px;
      font-weight: 700;
      color: #0ea5e9;
      letter-spacing: 0.1em;
      text-align: center;
      padding: 30px 0 10px;
      user-select: none;
    }
    .content {
      padding: 0 40px 40px;
      font-size: 16px;
      line-height: 1.6;
      color: #334155;
    }
    .content p {
      margin: 16px 0;
    }
    .btn-container {
      text-align: center;
      margin: 30px 0;
    }
    .btn {
      background-color: #0ea5e9;
      color: white !important;
      padding: 12px 28px;
      font-size: 16px;
      border-radius: 5px;
      text-decoration: none;
      display: inline-block;
      font-weight: 600;
      box-shadow: 0 3px 8px rgb(14 165 233 / 0.4);
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #0b94ce;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding: 25px 40px 20px;
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
      user-select: none;
    }
    .footer a {
      color: #0ea5e9;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="top-bar"></div>
    <div class="header">Thesis Journal</div>

    <div class="content">
      <p>Hi <strong>{name}</strong>,</p>
      <p>Welcome to <strong>Thesis Journal</strong> — the platform built to support researchers, students, and academics in sharing peer-reviewed scholarly work.</p>
      <p>You can now submit research, collaborate with reviewers, and manage your academic profile.</p>

      <div class="btn-container">
        <a href="https://your-domain.com/dashboard" target="_blank" class="btn">Go to Dashboard</a>
      </div>

      <p>Happy publishing!<br />— The Thesis Journal Team</p>
    </div>

    <div class="footer">
      Thesis Journal, Dhaka, Bangladesh<br />
      <a href="mailto:support@thesisjournal.com">support@thesisjournal.com</a>
    </div>
  </div>
</body>

</html>`;



export const sendUrlEmailTemplate = ({ resetURL }) => {
  return `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding: 40px;border-radius: 8px;box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color: #0ea5e9; font-size: 28px; margin: 0;">Journal</h1>
                <p style="color: #888; font-size: 14px; margin-top: 6px;">Academic Research Platform</p>
              </td>
            </tr>

            <tr>
              <td style="padding-top: 20px; text-align: center;">
                <h2 style="color: #111; font-size: 22px;">Reset Your Password</h2>
                <p style="color: #444; font-size: 16px; line-height: 1.6;">
                  We've received a request to reset your password. Click the button below to continue.
                </p>
                <a href="${resetURL}" target="_blank"
                  style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #0ea5e9; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                  Reset Password
                </a>
                <p style="color: #999; font-size: 13px; margin-top: 30px;">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-top: 40px; text-align: center; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #aaa; margin-top: 20px;">
                  &copy; ${new Date().getFullYear()} Journal. All rights reserved.<br />
                  Dhaka, Bangladesh
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};




export const resetSuccessEmailTemplate = () => {
  return `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Password Reset Successful</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding: 40px;border-radius: 8px;box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <h1 style="color: #0ea5e9; font-size: 28px; margin: 0;">Journal</h1>
                  <p style="color: #888; font-size: 14px; margin-top: 6px;">Academic Research Platform</p>
                </td>
              </tr>

              <tr>
                <td style="text-align: center;">
                  <h2 style="color:#111;">Password Reset Successful</h2>
                  <p style="color: #444; font-size: 16px; line-height: 1.6;">
                    Your password has been successfully changed. You can now log in with your new password.
                  </p>
                  <a href="${process.env.CLIENT_URL}/auth/login" target="_blank"
                    style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #0ea5e9; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                    Log In Now
                  </a>
                </td>
              </tr>

              <tr>
                <td style="padding-top: 40px; text-align: center; border-top: 1px solid #eee;">
                  <p style="font-size: 12px; color: #aaa; margin-top: 20px;">
                    &copy; ${new Date().getFullYear()} Journal. All rights reserved.<br />
                    Dhaka, Bangladesh
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
