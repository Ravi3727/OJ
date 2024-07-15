import mongoose, { Schema, Document } from "mongoose";

export interface Contest extends Document {
    title: string;
    description: string;
    eventDate: Date;
    HostedBy: string;
    problems: string[];
    difficulty: string;
    createdAt: Date;
    duration: string;
    users: { username: string; score: string }[];
    time: string;
}

const ContestSchema: Schema<Contest> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title of question is required"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Contest description is required"],
    },
    HostedBy: {
        type: String,
        required: true,
    },
    problems: {
        type: [String],
        required: true,
    },
    difficulty: {
        type: String,
        required: [true, "Difficulty of contest is required"],
    },
    duration: {
        type: String,
        required: [true, "Duration of contest is required"],
    },
    eventDate: {
        type: Date, // Changed to Date
        required: [true, "Event date of contest is required"],
    },
    users: {
        type: [
            {
                username: String,
                score: String,
            }
        ],
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const contestModel = (mongoose.models.contest as mongoose.Model<Contest>) || mongoose.model<Contest>("contest", ContestSchema);

export default contestModel;
