import { z } from "zod";


export const MessageSchema = z.object({
    content: z.string()
        .min(2, { message: "Content must be atleat 2 character" })
        .max(200, { message: "Content must be less than 200 character" })
})
