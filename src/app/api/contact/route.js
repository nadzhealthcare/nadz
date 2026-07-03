import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendMailViaResend, isResendConfigured } from '@/lib/resendMail';
import { sendMailViaSendGrid, isSendGridConfigured } from '@/lib/sendgridMail';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, age, gender, phone, email, address, requiredService } = body;

    if (!fullName || !phone || !email || !address || !requiredService) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const useResend = isResendConfigured();
    const useSendGrid = isSendGridConfigured();

    const recipientEmail =
      process.env.CONTACT_EMAIL ||
      (useResend ? process.env.RESEND_FROM_EMAIL : null) ||
      (useSendGrid ? process.env.SENDGRID_FROM_EMAIL : null) ||
      smtpUser;

    if (!useResend && !useSendGrid && (!smtpHost || !smtpUser || !smtpPassword)) {
      console.error(
        'Email not configured: set RESEND_API_KEY + RESEND_FROM_EMAIL, or SENDGRID_* , or SMTP_* variables.'
      );
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not configured. Please contact the administrator.',
        },
        { status: 500 }
      );
    }

    if (!recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'Email service is not configured (missing recipient).' },
        { status: 500 }
      );
    }

    const emailSubject = `New Contact Form Submission from ${fullName}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4F052B 0%, #6c0d3a 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #4F052B; }
            .value { margin-top: 5px; color: #555; }
            .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${fullName}</div>
              </div>
              ${age ? `
              <div class="field">
                <div class="label">Age:</div>
                <div class="value">${age}</div>
              </div>
              ` : ''}
              ${gender ? `
              <div class="field">
                <div class="label">Gender:</div>
                <div class="value">${gender.charAt(0).toUpperCase() + gender.slice(1)}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Address for Visit:</div>
                <div class="value">${address}</div>
              </div>
              <div class="field">
                <div class="label">Required Service:</div>
                <div class="value">${requiredService}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the NADZ Healthcare contact form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission

Full Name: ${fullName}
${age ? `Age: ${age}` : ''}
${gender ? `Gender: ${gender.charAt(0).toUpperCase() + gender.slice(1)}` : ''}
Phone Number: ${phone}
Email: ${email}
Address for Visit: ${address}
Required Service: ${requiredService}

Submitted on: ${new Date().toLocaleString()}
    `;

    const sendTimeoutMs = 25000;

    if (useResend) {
      const fromName =
        process.env.RESEND_FROM_NAME || 'NADZ Healthcare Contact Form';
      const sendPromise = sendMailViaResend({
        to: recipientEmail,
        fromEmail: process.env.RESEND_FROM_EMAIL,
        fromName,
        replyTo: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email send timeout')), sendTimeoutMs)
      );
      const info = await Promise.race([sendPromise, timeoutPromise]);
      console.log('Email sent (Resend):', info.messageId);
      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully',
        messageId: info.messageId,
      });
    }

    if (useSendGrid) {
      const fromName =
        process.env.SENDGRID_FROM_NAME || 'NADZ Healthcare Contact Form';
      const sendPromise = sendMailViaSendGrid({
        to: recipientEmail,
        fromEmail: process.env.SENDGRID_FROM_EMAIL,
        fromName,
        replyTo: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email send timeout')), sendTimeoutMs)
      );
      const info = await Promise.race([sendPromise, timeoutPromise]);
      console.log('Email sent (SendGrid):', info.messageId);
      return NextResponse.json({
        success: true,
        message: 'Contact form submitted successfully',
        messageId: info.messageId,
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: typeof smtpPassword === 'string' ? smtpPassword.replace(/\s+/g, '') : smtpPassword,
      },
      requireTLS: smtpPort === 587,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    const sendPromise = transporter.sendMail({
      from: `"NADZ Healthcare Contact Form" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Email send timeout')), sendTimeoutMs)
    );
    const info = await Promise.race([sendPromise, timeoutPromise]);

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    const code = error?.code;
    const responseCode = error?.responseCode;
    console.error('Error sending email:', {
      code,
      responseCode,
      message: error?.message,
      command: error?.command,
    });
    const isTimeout = error?.message === 'Email send timeout';
    let clientError = 'Failed to send email. Please try again later.';
    if (isTimeout) {
      clientError = 'Request took too long. Please try again later.';
    } else if (code === 'EAUTH' || responseCode === 535) {
      clientError =
        'Mail server rejected the login. Check SMTP_USER matches the Google account and SMTP_PASSWORD is a valid App Password.';
    } else if (['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'ESOCKET'].includes(code)) {
      clientError =
        'Could not reach the mail server from this host. Check firewall/outbound SMTP (ports 465 or 587).';
    } else if (error?.statusCode >= 400) {
      clientError =
        'Email service rejected the request. Check Resend/SendGrid API key and verified sender domain.';
    }
    return NextResponse.json(
      {
        success: false,
        error: clientError,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: isTimeout ? 504 : 500 }
    );
  }
}
