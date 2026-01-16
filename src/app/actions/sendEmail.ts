"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  try {
    const data = await resend.emails.send({
      // FREE TIER RULE: You MUST use this email as the 'from' address
      from: "Contact Form <onboarding@resend.dev>",

      // FREE TIER RULE: You can only send to your own verified email
      to: ["iannmacabulos@gmail.com"],

      // This allows you to click "Reply" in Gmail and reply directly to the user
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
      return { error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
};
