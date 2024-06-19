import mongoose, { Schema, Document } from "mongoose";

export interface userProfile extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    collegeName:string;
    userBio: string;
    QuestionsSolved: [];
    ContestCompleted: [];
    rating: number;
    createdAt: Date;
}

const UserSchema: Schema<userProfile> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/,"Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode:{
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "verifyCodeExpiry is required"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    collegeName:{
        type: String,
        required: [true, "Colege name is required"],
    },
    userBio: {
        type: String,
        required: false,
    },
    QuestionsSolved: [String],
    ContestCompleted: [String],
    rating: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = (mongoose.models.User as mongoose.Model<userProfile>) || mongoose.model<userProfile>("User",UserSchema)

export default UserModel;