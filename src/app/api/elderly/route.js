import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendMailViaResend, isResendConfigured } from '@/lib/resendMail';
import { sendMailViaSendGrid, isSendGridConfigured } from '@/lib/sendgridMail';

const RECIPIENT_EMAIL = process.env.BOOK_DOCTOR_EMAIL || 'pre@nadzhealthcare.com';

function escapeHtml(s) {
  if (s == null || s === '') return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailContent(body) {
  const {
    yourName,
    patientName,
    patientAge,
    gender,
    phone,
    email,
    address,
    requiredService,
  } = body;

  const genderDisplay =
    gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : String(gender);
  const genderHtml = escapeHtml(genderDisplay);

  const emailSubject = `Elderly consultation — ${yourName} (patient: ${patientName})`;
  const safeAddr = escapeHtml(address).replace(/\n/g, '<br>');

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
              <h2>Elderly — Free Doctor Consultation at Home</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Your Name:</div>
                <div class="value">${escapeHtml(yourName)}</div>
              </div>
              <div class="field">
                <div class="label">Patient&apos;s Name:</div>
                <div class="value">${escapeHtml(patientName)}</div>
              </div>
              <div class="field">
                <div class="label">Patient&apos;s Age:</div>
                <div class="value">${escapeHtml(patientAge)}</div>
              </div>
              <div class="field">
                <div class="label">Gender:</div>
                <div class="value">${genderHtml}</div>
              </div>
              <div class="field">
                <div class="label">Phone No.:</div>
                <div class="value">${escapeHtml(phone)}</div>
              </div>
              <div class="field">
                <div class="label">Email Id.:</div>
                <div class="value">${escapeHtml(email)}</div>
              </div>
              <div class="field">
                <div class="label">Address for Visit:</div>
                <div class="value">${safeAddr}</div>
              </div>
              <div class="field">
                <div class="label">Required Service:</div>
                <div class="value">${escapeHtml(requiredService)}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from nadzhealthcare.com/elderly</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

  const emailText = `
Elderly — Free Doctor Consultation at Home

Your Name: ${yourName}
Patient's Name: ${patientName}
Patient's Age: ${patientAge}
Gender: ${genderDisplay}
Phone No.: ${phone}
Email Id.: ${email}
Address for Visit: ${address}
Required Service: ${requiredService}

Submitted on: ${new Date().toLocaleString()}
    `;

  return { emailSubject, emailHtml, emailText };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      yourName,
      patientName,
      patientAge,
      gender,
      phone,
      email,
      address,
      requiredService,
    } = body;

    if (
      !yourName ||
      !patientName ||
      !patientAge ||
      !gender ||
      !phone ||
      !email ||
      !address ||
      !requiredService
    ) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const { emailSubject, emailHtml, emailText } = buildEmailContent(body);

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    const useResend = isResendConfigured();
    const useSendGrid = isSendGridConfigured();

    if (!useResend && !useSendGrid && (!smtpHost || !smtpUser || !smtpPassword)) {
      console.error(
        'Email configuration missing. Set RESEND_API_KEY + RESEND_FROM_EMAIL, or SENDGRID_*, or SMTP_*.'
      );
      return NextResponse.json(
        { success: false, error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    const fromNameResend = process.env.RESEND_FROM_NAME || 'NADZ Healthcare';
    const fromNameSendGrid = process.env.SENDGRID_FROM_NAME || 'NADZ Healthcare';

    if (useResend) {
      const info = await sendMailViaResend({
        to: RECIPIENT_EMAIL,
        fromEmail: process.env.RESEND_FROM_EMAIL,
        fromName: fromNameResend,
        replyTo: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
      console.log('[elderly] Email sent (Resend). MessageId:', info.messageId, 'To:', RECIPIENT_EMAIL);
      return NextResponse.json({
        success: true,
        message: "Thank you. We'll be in touch soon.",
      });
    }

    if (useSendGrid) {
      const info = await sendMailViaSendGrid({
        to: RECIPIENT_EMAIL,
        fromEmail: process.env.SENDGRID_FROM_EMAIL,
        fromName: fromNameSendGrid,
        replyTo: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
      console.log('[elderly] Email sent (SendGrid). MessageId:', info.messageId, 'To:', RECIPIENT_EMAIL);
      return NextResponse.json({
        success: true,
        message: "Thank you. We'll be in touch soon.",
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

    const info = await transporter.sendMail({
      from: `"NADZ Healthcare" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });
    console.log('[elderly] Email sent (SMTP). MessageId:', info.messageId, 'To:', RECIPIENT_EMAIL);

    return NextResponse.json({
      success: true,
      message: "Thank you. We'll be in touch soon.",
    });
  } catch (error) {
    console.error('Error sending elderly consultation email:', error);
    const code = error?.code || '';
    const message = error?.message || '';
    const isTimeout = message === 'Email send timeout' || code === 'ETIMEDOUT' || code === 'ESOCKET';
    const isAuth = code === 'EAUTH' || message.toLowerCase().includes('authentication');
    const isConnection = code === 'ECONNREFUSED' || code === 'ETIMEDOUT' || code === 'ENOTFOUND';

    let userMessage = 'Failed to send your request. Please try again or contact us directly.';
    if (isTimeout || isConnection) {
      userMessage = 'Unable to reach the mail server. Please try again later or call us.';
    } else if (isAuth) {
      userMessage = 'Email configuration error. Please contact the administrator.';
    } else if (error?.statusCode >= 400) {
      userMessage =
        'Email service rejected the request. Check Resend/SendGrid API key and verified sender domain.';
    }

    return NextResponse.json(
      {
        success: false,
        error: userMessage,
        ...(process.env.NODE_ENV === 'development' && { details: message, code }),
      },
      { status: isTimeout ? 504 : 500 }
    );
  }
}
