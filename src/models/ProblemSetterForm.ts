import mongoose, { Schema, Document } from "mongoose";

export interface problemSetter extends Document {
    leetCode: string;
    codeForces?: string;
    codeCheaf?: string;
    other?: string;
    username: string;
    createdAt: Date;
    verified: boolean;
}

const problemSetterSchema: Schema<problemSetter> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    leetCode: {
        type: String,
        required: false,
    },
    codeForces: {
        type: String,
        required: false,
    },
    codeCheaf: {
        type: String,
        required: false,
    },
    other: {
        type: String,
        required: false,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const problemSetterModel = (mongoose.models.problemSetter as mongoose.Model<problemSetter>) || mongoose.model<problemSetter>("problemSetter", problemSetterSchema);

export default problemSetterModel;
