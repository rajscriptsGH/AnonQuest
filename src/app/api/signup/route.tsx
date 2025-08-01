import { dbConnect } from "@/lib/database";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from 'bcrypt'

export async function SignUp(request: Request) {
    await dbConnect()

    try {

    } catch (error) {
        console.log("Error registering user", error);
        Response.json({
            success: false,
            message: "There is some error registering, try again later",
        },
            {
                status: 500
            }
        )

    }
}