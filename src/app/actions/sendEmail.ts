"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // 1. Basic Empty Check
  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  // 2. Server-Side Email Validation
  // This Regex checks if the email has an "@" and a "." domain part
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address (e.g., you@example.com)." };
  }

  try {
    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["iannmacabulos@gmail.com"],
      
      // The user's email goes here so you can click 'Reply' in Gmail
      replyTo: email, 

      subject: `Portfolio Message from ${name}`,
      text: message,
      html: `
        <div>
          <h2>New Message from your Portfolio</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    if (data.error) {
      // 3. Catch 'Technical' API errors and make them friendly
      if (data.error.message.toLowerCase().includes("reply_to")) {
         return { error: "Please enter a valid email address." };
      }
      return { error: "Failed to send message. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
};