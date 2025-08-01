import { z } from "zod";


export const signIpSchema = z.object({
    username: z.string(),
    password: z.string()
})

