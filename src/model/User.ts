import mongoose, { Schema, Document } from "mongoose";

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
