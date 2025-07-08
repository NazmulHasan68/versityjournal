import { resend } from "./config.js";
import {
  verificationTokenEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
  sendUrlEmailTemplate,
  resetSuccessEmailTemplate,
} from "./email-template.js";
import { sendEmailForUpdateStatusAndMessageTemplate, sendEmailToResearcherTemplate, sendEmailToSubEditorTemplate } from "./email_assign_template.js";



//=============================================================================================
//                                       Authentication
// ============================================================================================
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Journal <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email Address Now",
      html: verificationTokenEmailTemplate.replace(
        "{verificationToken}",
        verificationToken
      ),
    });
  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error("Error sending verification email");
  }
};


export const sendWelcomeEmail = async (email, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Journal <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to our company",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    });
  } catch (error) {
    console.log("error sending welcome email", error);
  }
};


export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const html = sendUrlEmailTemplate({ resetURL });

    const { data, error } = await resend.emails.send({
      from: "Journal <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password",
      html,
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("Error sending password reset email", error);
  }
};


export const sendResetSuccessEmail = async (email) => {
  try {
    const html = resetSuccessEmailTemplate();

    const { data, error } = await resend.emails.send({
      from: "Journal <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset Was Successful",
      html,
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("Error sending password reset success email", error);
  }
};


//=============================================================================================
//                                       Assgin thesis
// ============================================================================================

export const sendEmailToSubEditor = async (email, thesisTitle, thesisId) => {
  const { subject, html } = sendEmailToSubEditorTemplate({ thesisTitle, thesisId });

  try {
    const { data, error } = await resend.emails.send({
      from: "Journal <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });

    console.log("Email sent sucessfully!");
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error sending sub-editor email:", err);
    throw new Error("Failed to send email to sub-editor.");
  }
};

export const sendEmailToResearcher = async (email, thesisTitle, status, thesisId) => {
  const { subject, html } = sendEmailToResearcherTemplate({ thesisTitle, status, thesisId });

  try {
    const { data, error } = await resend.emails.send({
      from: "Journal <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });
    console.log("Email sent sucessfully!");
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error sending researcher email:", err);
    throw new Error("Failed to send email to researcher.");
  }
};
// ==============================================================================================
export const sendEmailForUpdateStatusandMessage = async (email, status, message) => {
  try {
    const subject = `Your Thesis Status: ${status.toUpperCase()}`;
    const html = sendEmailForUpdateStatusAndMessageTemplate(status, message);

    const { data, error } = await resend.emails.send({
      from: "Journal <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });

    console.log("✅ Email sent successfully to", email);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("❌ Error sending email to researcher:", err);
    throw new Error("Failed to send email to researcher.");
  }
};

export const sendEmailForStatus = async (email, status) => {
  try {
    const formattedStatus = status?.toLowerCase();

    let statusMessage = "";
    let highlightColor = "#007bff"; // default blue

    switch (formattedStatus) {
      case "accepted":
        statusMessage = "Congratulations! Your thesis has been accepted.";
        highlightColor = "green";
        break;
      case "rejected":
        statusMessage = "We regret to inform you that your thesis has been rejected.";
        highlightColor = "red";
        break;
      case "published":
        statusMessage = "Great news! Your thesis has been published successfully.";
        highlightColor = "purple";
        break;
      case "under_review":
        statusMessage = "Your thesis is currently under review.";
        highlightColor = "orange";
        break;
      default:
        statusMessage = `Your thesis status is now: ${status}`;
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; color: #333;">
        <h2>Hello Researcher,</h2>
        <p>${statusMessage}</p>
        <p><strong>Current Status:</strong> <span style="color: ${highlightColor}; text-transform: capitalize;">${status}</span></p>
        <p>Thank you for your submission and continued contribution to our journal platform.</p>
        <p style="margin-top: 40px;">Best regards,<br/>— Journal Team</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Journal Team <onboarding@resend.dev>",
      to: [email],
      subject: `📘 Thesis Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      html,
    });

    if (error) {
      console.error("Email sending error:", error);
      throw new Error("Failed to send thesis status update email.");
    }

    console.log("✅ Status update email sent to:", email);
    return data;
  } catch (err) {
    console.error("sendEmailForStatus error:", err);
    throw err;
  }
};