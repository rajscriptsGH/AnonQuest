import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User extends DefaultSession["user"] {
        _id: string
        isVerified?: boolean
        isAcceptingMessage?: boolean
        username?: string
    }

    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id: string
        isVerified?: boolean
        isAcceptingMessage?: boolean
        username?: string
    }
}
