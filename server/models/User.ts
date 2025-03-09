import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the User interface
interface IUser extends Document {
  email: string;
  passwordHash: string;
  comparePassword(password: string): Promise<boolean>;
}

// Define the User schema
const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

// Add the comparePassword method to the schema
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

// Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;