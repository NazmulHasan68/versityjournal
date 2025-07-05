import { resend } from "./config.js";
import {
  verificationTokenEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
  sendUrlEmailTemplate,
  resetSuccessEmailTemplate,
} from "./email-template.js";

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