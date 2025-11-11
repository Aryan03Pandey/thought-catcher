import mongoose, { Document, Model, Schema } from "mongoose";
import crypto from "crypto";

export interface IRefreshToken extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
  isExpired(): boolean;
  compareCandidate(candidate: string): boolean;
}

interface IRefreshTokenModel extends Model<IRefreshToken> {
  findByTokenCandidate(candidate: string): Promise<IRefreshToken | null>;
  revokeAllForUser(userId: mongoose.Types.ObjectId): Promise<void>;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false }
);

// 🔒 Hash utility — use a strong hash function
function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// ===========================
// 🧩 Instance Methods
// ===========================
RefreshTokenSchema.methods.isExpired = function (): boolean {
  return this.expiresAt.getTime() < Date.now();
};

RefreshTokenSchema.methods.compareCandidate = function (candidate: string): boolean {
  return this.tokenHash === hashToken(candidate);
};

// ===========================
// 🧩 Static Methods
// ===========================
RefreshTokenSchema.statics.findByTokenCandidate = async function (
  candidate: string
): Promise<IRefreshToken | null> {
  const hashed = hashToken(candidate);
  return this.findOne({ tokenHash: hashed });
};

RefreshTokenSchema.statics.revokeAllForUser = async function (
  userId: mongoose.Types.ObjectId
): Promise<void> {
  await this.deleteMany({ userId });
};

// ===========================
// 🧱 Model Export
// ===========================
const RefreshToken = mongoose.model<IRefreshToken, IRefreshTokenModel>(
  "RefreshToken",
  RefreshTokenSchema
);

export default RefreshToken;