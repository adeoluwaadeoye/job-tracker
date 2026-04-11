import mongoose, { Schema, Model } from "mongoose";

export interface IVerificationToken {
  email: string;
  code: string;
  expires: Date;
  attempts: number;
  createdAt: Date;
}

const VerificationTokenSchema = new Schema<IVerificationToken>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expires: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Auto delete expired tokens
VerificationTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const VerificationToken: Model<IVerificationToken> =
  mongoose.models.VerificationToken ||
  mongoose.model<IVerificationToken>("VerificationToken", VerificationTokenSchema);

export default VerificationToken;