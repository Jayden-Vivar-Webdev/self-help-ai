// import { EmailTemplate } from '@/app/components/email-template/email-template';
// import { Resend } from 'resend';
// import * as React from 'react';
// import crypto from 'crypto';

// const resend = new Resend(process.env.RESEND_API_KEY);

// // Temporary in-memory store (for testing only – replace with DB in production)
// const tokenStore = new Map();

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, firstName } = body;

//     if (!email || !firstName) {
//       return Response.json({ error: 'Email and firstName are required' }, { status: 400 });
//     }

//     // 1. Generate token
//     const token = crypto.randomBytes(32).toString('hex');
//     const expiresAt = Date.now() + 1000 * 60 * 60; // 1 hour

//     // 2. Store token (replace this with a DB call)
//     tokenStore.set(token, { email, expiresAt, used: false });

//     // 3. Create magic link
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000';
//     const magicLink = `${baseUrl}/verify?token=${token}`;

//     // 4. Send email with magic link
//     const { data, error } = await resend.emails.send({
//       from: process.env.USER_EMAIL,
//       to: [email],
//       subject: 'Verify your email',
//       react: React.createElement(EmailTemplate, {
//         firstName,
//         link: magicLink,
//       }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json({ message: 'Email sent successfully', data });
//   } catch (error) {
//     return Response.json({ error: 'Internal server error' + error }, { status: 500 });
//   }
// }


//TESTING SUITE 
// app/api/emailAuth/route.ts

import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

function emailHtmlTemplate(firstName: string, link: string) {
  return `
    <div>
      <h1>Welcome, ${firstName}!</h1>
      <p>Click the link to verify your email: <a href="${link}">${link}</a></p>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName } = body;

    if (!email || !firstName) {
      return new Response(JSON.stringify({ error: 'Email and firstName are required' }), { status: 400 });
    }

    // 1. Create JWT
    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign(
      {
        email,
        firstName,
      },
      secret,
      { expiresIn: '1h' }
    );

    // 2. Generate magic link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const magicLink = `${baseUrl}/verify?token=${token}`;

    // 3. Create HTML email content
    const htmlContent = emailHtmlTemplate(firstName, magicLink);

    // 4. Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: htmlContent,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error: ' + error }), { status: 500 });
  }
}
