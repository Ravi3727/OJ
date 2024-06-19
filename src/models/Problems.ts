import mongoose, { Schema, Document } from "mongoose";

export interface problem extends Document {
    title: string;
    statement: string;
    testCases: [string],
    createdAt : Date;
}

const ProblemsSchema: Schema<problem> = new Schema({
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
    testCases: {
        type: [String],
        required: true  
      },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ProblemsModel = (mongoose.models.Problems as mongoose.Model<problem>) || mongoose.model<problem>("Problems", ProblemsSchema)

export default ProblemsModel;