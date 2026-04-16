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

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    const [notificationData, autoReplyData] = await Promise.all([
      // 1. Notification Email to You (Structured Dark Mode SaaS Style)
      resend.emails.send({
        from: `Portfolio <${senderEmail}>`,
        to: [receiverEmail],
        replyTo: email, 
        subject: `New Message from ${name}`,
        text: message,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          </head>
          <body style="font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #000000; color: #ffffff; margin: 0; padding: 40px 20px; -webkit-font-smoothing: antialiased;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #262626; border-radius: 8px; padding: 32px;">

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="left" valign="middle">
                    <h2 style="font-size: 18px; font-weight: 600; margin: 0; color: #ffffff; letter-spacing: -0.5px;">Incoming Inquiry</h2>
                  </td>
                  <td align="right" valign="middle">
                    <span style="font-size: 12px; color: #888888; background-color: #171717; padding: 6px 12px; border-radius: 9999px; border: 1px solid #262626; letter-spacing: 0.5px;">ACTION REQUIRED</span>
                  </td>
                </tr>
              </table>

              <div style="border: 1px solid #262626; border-radius: 6px; overflow: hidden; margin-bottom: 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px;">
                  <tr>
                    <td width="100" style="padding: 16px; border-bottom: 1px solid #262626; border-right: 1px solid #262626; color: #737373; font-weight: 500;">From</td>
                    <td style="padding: 16px; border-bottom: 1px solid #262626; color: #ffffff;">${name} &lt;${email}&gt;</td>
                  </tr>
                  <tr>
                    <td width="100" style="padding: 16px; border-bottom: 1px solid #262626; border-right: 1px solid #262626; color: #737373; font-weight: 500;">Subject</td>
                    <td style="padding: 16px; border-bottom: 1px solid #262626; color: #ffffff;">Portfolio Contact Form</td>
                  </tr>
                  <tr>
                    <td width="100" style="padding: 16px; border-right: 1px solid #262626; color: #737373; font-weight: 500;">Date</td>
                    <td style="padding: 16px; color: #a3a3a3;">${currentDate}</td>
                  </tr>
                </table>
              </div>

              <div>
                <p style="font-size: 12px; color: #737373; margin: 0 0 12px 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Message Content</p>
                <div style="background-color: #000000; border: 1px solid #262626; border-radius: 6px; padding: 24px;">
                  <p style="font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap; color: #d4d4d4;">${message}</p>
                </div>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #262626;">
                <tr>
                  <td align="left">
                     <a href="mailto:${email}" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-weight: 500; font-size: 14px; transition: opacity 0.2s;">Reply Directly</a>
                  </td>
                </tr>
              </table>

            </div>
          </body>
          </html>
        `,
      }),
      // 2. Auto-Reply to the Sender (Enterprise Receipt Style)
      resend.emails.send({
        from: `Ian Macabulos <${senderEmail}>`,
        to: [email],
        subject: "Confirmation: Message Received",
        text: "Hello, I have received your message and will review it shortly. You can view the full details in the HTML version of this email.",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          </head>
          <body style="font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa; color: #000000; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 60px 20px; background-color: #fafafa;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; text-align: left;">
                    
                    <tr>
                      <td style="padding: 40px 40px 0 40px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <img src="https://www.iansebastian.dev/logo/personal-logo-white.png" alt="Ian Macabulos Logo" width="40" height="40" style="display: block; border-radius: 8px; background-color: #000000;" />
                            </td>
                            <td align="right">
                              <span style="font-family: ui-monospace, Menlo, Monaco, monospace; font-size: 12px; color: #888888; background-color: #f5f5f5; padding: 6px 12px; border-radius: 9999px; border: 1px solid #e5e5e5;">STATUS: RECEIVED</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 32px 40px;">
                        <h1 style="font-size: 22px; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 16px 0; color: #000000;">Message confirmation</h1>
                        <p style="font-size: 16px; line-height: 1.6; color: #525252; margin: 0 0 24px 0;">Hello ${name},</p>
                        <p style="font-size: 16px; line-height: 1.6; color: #525252; margin: 0 0 32px 0;">Thank you for reaching out. This is an automated confirmation that your message has been securely routed to my inbox. I will review it and reply directly to this thread as soon as possible.</p>
                        
                        <div style="background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-bottom: 16px; border-bottom: 1px solid #eaeaea;">
                                <p style="font-size: 12px; font-weight: 500; color: #888888; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Date</p>
                                <p style="font-size: 15px; font-weight: 500; color: #000000; margin: 0;">${currentDate}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 16px;">
                                <p style="font-size: 12px; font-weight: 500; color: #888888; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
                                <p style="font-size: 15px; font-weight: 500; color: #000000; margin: 0;">Portfolio Inquiry</p>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <a href="https://www.iansebastian.dev/projects" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px; text-align: center;">View Recent Work</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 24px 40px; background-color: #fafafa; border-top: 1px solid #eaeaea;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <p style="font-size: 14px; font-weight: 600; color: #000000; margin: 0 0 4px 0;">Ian Macabulos</p>
                              <p style="font-size: 14px; color: #737373; margin: 0;">Full-Stack Developer</p>
                            </td>
                            <td align="right">
                              <a href="https://www.iansebastian.dev" style="font-size: 14px; color: #737373; text-decoration: underline;">iansebastian.dev</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="font-size: 12px; color: #a3a3a3; margin: 24px 0 0 0; text-align: center;">This is an automated system receipt. Please do not reply directly to this email.</p>
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