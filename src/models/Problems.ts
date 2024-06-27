import mongoose, { Schema, Document } from "mongoose";

export interface Problem extends Document {
    title: string;
    statement: string;
    testCases: string[],
    tags: string[],
    difficulty: string,
    createdAt: Date;
}

const ProblemsSchema: Schema<Problem> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title of question is required"],
        unique: true,
    },
    statement: {
        type: String,
        required: [true, "Statement of question is required"],
        unique: true,
    },
    tags: {
        type: [String],
        required: true
    },
    testCases: {
        type: [String],
        required: true
    },
    difficulty:{
        type: String,
        required: [true, "Difficulty of question is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

 
const ProblemsModel = (mongoose.models.Problem as mongoose.Model<Problem>) || mongoose.model<Problem>("Problem", ProblemsSchema);

export default ProblemsModel;