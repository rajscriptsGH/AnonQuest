import { dbConnect } from "@/lib/database";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from 'bcrypt'

export async function SignUp(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()

        const existingVerifiedUsername = await UserModel.findOne({
            username,
            isVerified: true,
        })
        if (existingVerifiedUsername) {
            return Response.json({
                success: false,
                message: "User already exits"
            }, { status: 400 }
            )
        }

        const existingUserByEmail = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        const hashPassword = await bcrypt.hash(password, 10);

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already exits"
                }, { status: 400 }
                )
            } else {
                existingUserByEmail.password = hashPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 36500000)
                await existingUserByEmail.save();
            }

        } else {
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)


            const newUser = await UserModel.create({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save();
            await sendVerificationEmail(email, username, verifyCode);

            return Response.json({
                success: true,
                message: "User registered. Verification code sent to your email.",
            }, { status: 201 });
        }

    } catch (error) {
        console.log("Error registering user", error);
        return Response.json({
            success: false,
            message: "There is some error registering, try again later",
        }, { status: 500 }
        )

    }
}