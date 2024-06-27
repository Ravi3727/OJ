import mongoose, { Schema, Document } from "mongoose";

export interface contest extends Document {
    title: string;
    description: string;
    eventDate: string;
    HostedBy : string;
    problems: string[];
    difficulty: string,
    createdAt: Date;
}

const ContestSchema: Schema<contest> = new mongoose.Schema({
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
        required: true
    },
    problems: {
        type: [String],
        required: true
    },
    difficulty:{
        type: String,
        required: [true, "Difficulty of contest is required"],
    },
    eventDate: {
        type: String,
        required: [true, "Event date of contest is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

 
const contestModel = (mongoose.models.contest as mongoose.Model<contest>) || mongoose.model<contest>("contest", ContestSchema);

export default contestModel;