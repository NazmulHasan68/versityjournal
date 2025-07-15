export const sendEmailToSubEditorTemplate = ({ thesisTitle, thesisId }) => {
  return {
    subject: "📄 New Thesis Assigned for Review",
    html: `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>New Thesis Assigned</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding: 40px;border-radius: 8px;box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <h1 style="color: #0ea5e9; font-size: 28px; margin: 0;">Shadow Journal</h1>
                  <p style="color: #888; font-size: 14px; margin-top: 6px;">Academic Research Platform</p>
                </td>
              </tr>

              <tr>
                <td style="text-align: center;">
                  <h2 style="color:#111;">New Thesis Assigned</h2>
                  <p style="color: #444; font-size: 16px; line-height: 1.6;">
                    You’ve been assigned the following thesis to review:
                    <br />
                    <strong>${thesisTitle}</strong>
                  </p>
                  <a href="${process.env.CLIENT_URL}/sub-editor/review/${thesisId}" target="_blank"
                    style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #0ea5e9; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                    📖 View Thesis
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
    `,
  };
};

export const sendEmailToResearcherTemplate = ({ thesisTitle, status, thesisId }) => {
  return {
    subject: `📢 Thesis Status Updated: ${status.replace(/_/g, " ")}`,
    html: `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Thesis Status Update</title>
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
                  <h2 style="color:#111;">Thesis Status Updated</h2>
                  <p style="color: #444; font-size: 16px; line-height: 1.6;">
                    Your thesis titled <strong>${thesisTitle}</strong> has been updated to:
                    <br />
                    <span style="font-size: 18px; font-weight: bold; color: #0ea5e9;">${status.replace(/_/g, " ").toUpperCase()}</span>
                  </p>
                  <a href="${process.env.CLIENT_URL}/researcher/thesis/${thesisId}" target="_blank"
                    style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #0ea5e9; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                    📝 View Thesis Details
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
    `,
  };
};


export const sendEmailForUpdateStatusAndMessageTemplate = (status, message) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
      <h2 style="color: #2c3e50;">Hello Researcher,</h2>

      <p>We would like to inform you that the status of your submitted thesis has been updated to:</p>
      <p style="font-size: 18px;">
        <strong style="color: ${status === "accepted" ? "#2ecc71" : status === "rejected" ? "#e74c3c" : "#f39c12"};">
          ${status.toUpperCase()}
        </strong>
      </p>

      <p><strong>Editor's Comment:</strong></p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 15px; color: #555; font-style: italic;">
        ${message}
      </blockquote>

      <p>If you have any questions, feel free to contact our editorial team.</p>

      <p>Best regards,<br/>The Journal Team</p>

      <hr style="margin-top: 30px;"/>
      <footer style="font-size: 12px; color: #999;">
        This is an automated message. Please do not reply to this email.
      </footer>
    </div>
  `;
};


export const sendEmailToReviewerTemplate = (thesisId) => {
  const url = `${process.env.CLIENT_URL}/reviewer/assignments/${thesisId}`;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>📝 New Thesis Assigned for Review</h2>
      <p>Hello Reviewer,</p>
      <p>You have been assigned a new thesis to review. Please read the thesis and share your feedback or comments as soon as possible.</p>
      <p>Click the button below to view and review the thesis:</p>
      <a href="${url}" 
         style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
         🔍 Review Thesis
      </a>
      <p>If the button doesn't work, copy and paste the following link in your browser:</p>
      <p><a href="${url}">${url}</a></p>
      <p>Other wise check your Dashboard </p>
      <p>Best regards,<br/>Journal Submission Team</p>
    </div>
  `;
};


export const sendEmailToAdminTemplate = (thesisId) => {
  const url = `${process.env.CLIENT_URL}/admin/thesis_article_management/${thesisId}`;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>📝 Paper Ready to Be Published</h2>
      
      <p>Dear Admin,</p>
      
      <p>
        A new thesis has been submitted and is ready for your review. 
        Please go through the thesis and provide your feedback or comments at your earliest convenience.
      </p>
      
      <p>
        Click the button below to view and manage the thesis:
      </p>
      
      <a href="${url}" 
         style="
           display: inline-block;
           padding: 10px 20px;
           margin-top: 10px;
           background-color: #007bff;
           color: white;
           text-decoration: none;
           border-radius: 4px;
         ">
         🔍 Review Thesis
      </a>

      <p style="margin-top: 20px;">
        If the button doesn't work, you can copy and paste the following link into your browser:
      </p>

      <p>
        <a href="${url}">${url}</a>
      </p>

      <p>Alternatively, you can also check your admin dashboard for the new submission.</p>

      <p>
        Best regards,<br/>
        <strong>Journal Submission Team</strong>
      </p>
    </div>
  `;
};


