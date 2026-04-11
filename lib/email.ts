import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(email: string, code: string, name: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Verify your JobTracker account",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 4px;">Hi ${name},</h2>
          <p style="color: #666; font-size: 14px; margin: 0;">Verify your JobTracker email address.</p>
        </div>
        <div style="background: #f9f9f9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <p style="font-size: 13px; color: #888; margin: 0 0 12px;">Your verification code</p>
          <div style="font-size: 40px; font-weight: 800; letter-spacing: 10px; color: #111;">${code}</div>
          <p style="font-size: 12px; color: #aaa; margin: 12px 0 0;">Expires in 10 minutes</p>
        </div>
        <p style="color: #999; font-size: 12px;">
          If you didn't create a JobTracker account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Reset your JobTracker password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Reset your password</h2>
        <p style="color: #666; font-size: 14px; margin-bottom: 24px;">
          Click the button below to reset your password. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background: #111; color: #fff; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
          Reset password
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}