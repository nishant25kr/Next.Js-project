import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { success } from "zod/v4";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifiCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Hello world',
            react: VerificationEmail({username, otp: verifiCode}),
        });
        return { success: true, message: "Failed to send successfully" }

    } catch (error) {

        console.error("Error in sending VarificationMail", error)
        return { success: false, message: "Failed to send varification mail" }

    }
}