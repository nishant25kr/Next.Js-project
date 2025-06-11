// /app/api/test-email/route.ts
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
// import VerificationEmail from "@/emails/VerificationEmail";
// import VerificationEmail from "@/components/emails/VerificationEmail";
import VerificationEmail from "../../../../emails/VerificationEmail";



export async function GET() {
  try {
    console.log('hi')
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "nishant927472@gmail.com", // your own email
      subject: "Testing email from Resend",
      react: VerificationEmail({ username: "testuser", otp: "123456" }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Test email failed", error);
    return NextResponse.json({ success: false, error });
  }
}
