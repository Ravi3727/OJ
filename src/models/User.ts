import mongoose, { Schema, Document } from "mongoose";

interface SolvedProblem {
    problemId: string;
    status: string;
    title: string;
    difficulty: string;
    codeSubmisionDate: Date;
    // language: string;s
}

export interface UserProfile extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isProblemSetter: boolean;
    collegeName: string;
    userBio: string;
    QuestionsSolved: SolvedProblem[];
    ParticipatedContests: { contestId: string, problemsSolved: SolvedProblem[] }[];
    rating: number;
    createdAt: Date;
    avatar: string;
    resetPasswordverifyCode: string;
    resetPasswordverifyCodeExpiry: Date;
    isResetPasswordVerified: boolean;
    Admin: boolean;
}

const UserSchema: Schema<UserProfile> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isProblemSetter: {
        type: Boolean,
        default: false,
    },
    collegeName: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    userBio: {
        type: String,
        required: false,
    },
    QuestionsSolved: [{
        problemId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        codeSubmisionDate: {
            type: Date,
            required: true
        },
        // language: {
        //     type: String,
        //     required: false
        // },
    }],
    ParticipatedContests: [
        {
            contestId: {
                type: String,
                required: true
            },
            problemsSolved:  [{
                problemId: {
                    type: String,
                    required: false
                },
                title: {
                    type: String,
                    required: false
                },
                difficulty: {
                    type: String,
                    required: false
                },
                status: {
                    type: String,
                    required: false
                },
                codeSubmisionDate: {
                    type: Date,
                    required: false
                },
                // language: {
                //     type: String,
                //     required: false
                // },
            }]
        }
    ],
    rating: {
        type: Number,
        default: 0,
    },
    resetPasswordverifyCode: {
        type: String,
        required: false,
    },
    resetPasswordverifyCodeExpiry: {
        type: Date,
        required: false,
    },
    isResetPasswordVerified: {
        type: Boolean,
        default: false,
    },
    Admin:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = (mongoose.models.User as mongoose.Model<UserProfile>) || mongoose.model<UserProfile>("User", UserSchema);

export default UserModel;
