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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL as string;
  const receiverEmail = process.env.NEXT_PUBLIC_RECEIVER_EMAIL as string;

  try {
    const [notificationData, autoReplyData] = await Promise.all([
      resend.emails.send({
        from: `Contact Form <${senderEmail}>`,
        to: [receiverEmail],
        replyTo: email, 
        subject: `New Message from ${name}`,
        text: message,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff; color: #171717; margin: 0; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto;">
              <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 24px 0;">New Portfolio Message</h2>
              <p style="font-size: 15px; color: #525252; margin: 0 0 8px 0;"><strong>From:</strong> ${name} (${email})</p>
              <div style="padding: 24px; background-color: #f5f5f5; border-radius: 4px; margin-top: 24px;">
                <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
      resend.emails.send({
        from: `Ian Macabulos <${senderEmail}>`,
        to: [email],
        subject: "Message Received",
        text: "Hi, I have received your message and will reach out to you soon.",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          </head>
          <body style="font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff; color: #171717; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
              <tr>
                <td align="center" style="padding: 80px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; text-align: left;">
                    <tr>
                      <td>
                        <img src="https://iansebastian.dev/logo/personal-logo-black.png" alt="Ian Macabulos" width="48" height="48" style="display: block; margin-bottom: 40px;" />
                        <h1 style="font-size: 24px; font-weight: 600; letter-spacing: -0.5px; margin: 0 0 24px 0;">Thank you for reaching out.</h1>
                        <p style="font-size: 16px; line-height: 1.6; color: #525252; margin: 0 0 16px 0;">Hi ${name},</p>
                        <p style="font-size: 16px; line-height: 1.6; color: #525252; margin: 0 0 40px 0;">I have received your message and will get back to you as soon as possible. I appreciate your interest and look forward to connecting.</p>
                        <a href="https://iansebastian.dev" style="display: inline-block; background-color: #171717; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-weight: 500; font-size: 15px;">Return to Website</a>
                        <div style="margin-top: 56px; padding-top: 32px; border-top: 1px solid #e5e5e5;">
                          <p style="font-size: 14px; color: #737373; margin: 0;">Best regards,<br><strong style="color: #171717;">Ian Macabulos</strong></p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      })
    ]);

    if (notificationData.error || autoReplyData.error) {
      const errorMsg = notificationData.error?.message || autoReplyData.error?.message || "";
      if (errorMsg.toLowerCase().includes("reply_to")) {
         return { error: "Please enter a valid email address." };
      }
      return { error: "Failed to send message. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
};