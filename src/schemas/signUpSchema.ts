import { z } from "zod";

//validate username
export const usernameValidation = z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Username must contain only letters and numbers" })
    .trim()
    .toLowerCase()

//validate email
export const emailValidation = z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Use valid email address")

//validate password
export const passwordValidation = z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(12, { message: "Username must be less than 12 characters" })
    .trim()

export const SignUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation
})

