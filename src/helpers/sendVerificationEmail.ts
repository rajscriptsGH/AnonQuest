import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    OTP: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'AnonQuest | Verification code',
            react: VerificationEmail({ username, otp: OTP }),
        });
        return {
            success: true,
            message: "Verification email"
        }
    } catch (error) {
        console.log("Error sending verification mail", error);
        return {
            success: false,
            message: "Verification email"
        }
    }
}