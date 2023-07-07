import mongoose, { Schema, model, Model } from 'mongoose';

// create interface representing the document in mongodb
export interface IUser {
    username: string;
    email: string;
    password: string;
}

// create schema corresponding to the document interface
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// check if model exists if so use existing model otherwise create new model
export const User = (mongoose.models.User || model("User", userSchema) as Model<IUser>)