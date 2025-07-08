import { resend } from "./config.js";
import {
  verificationTokenEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
  sendUrlEmailTemplate,
  resetSuccessEmailTemplate,
} from "./email-template.js";
import { sendEmailToResearcherTemplate, sendEmailToSubEditorTemplate } from "./email_assign_template.js";



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