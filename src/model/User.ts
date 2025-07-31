import mongoose, { Schema, Document, mongo } from "mongoose";

//create Message interface
export interface Message extends Document {
    content: string;
    createdAt: Date;
}


//create schema for Message
const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})


//create User interface
export interface User extends Document {
    username: string;
    email: string;
    password: string
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean
    messages: []
}

//create schema for User
const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Use valid email"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [4, "Password must be at least 4 characters"]
    },
    verifyCode: {
        type: String,
        required: [true, "Code required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Code required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel;