import { Request } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User, IUser } from "@/db/models";
import RefreshToken from "@/db/models/RefreshToken";
import { verifyGoogleToken } from "@/config/googleConfig";
import env from "@/env";
import { errors } from "@/utils";

export class UserService {
  constructor(){}
  
  private generateRandomString(
    length: number = 40,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ): string {
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    const charLength = characters.length;
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(randomValues[i] % charLength);
    }

    return result;
  }

  async login(req: Request) {
    const { token } = req.body;
    
    if (!token) throw new Error("No token id in response");

    // ✅ Verify Google token
    const googleUser = await verifyGoogleToken(token);

    // ✅ Find or create user
    let user = await User.findOne({ googleId: googleUser.sub });
    if (!user) {
      user = await User.create({
        googleId: googleUser.sub,
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
      });
    }

    // ✅ Create JWT (Access Token)
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      env.jwt_secret!,
      { expiresIn: "15m" } // shorter expiry for better security
    );

    // ✅ Create Refresh Token
    const refreshTokenRaw = this.generateRandomString();
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshTokenRaw)
      .digest("hex");

    await RefreshToken.create({
      userId: user._id,
      tokenHash: refreshTokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return {
      accessToken: jwtToken,
      refreshToken: refreshTokenRaw,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    };
  }

  async refresh(req: Request) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("No refresh token provided");

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const tokenRow = await RefreshToken.findOne({ tokenHash: refreshTokenHash });

    if (!tokenRow) throw new Error("Invalid refresh token");
    if (tokenRow.expiresAt.getTime() < Date.now()) {
      await tokenRow.deleteOne();
      throw new Error("Expired refresh token");
    }

    // ✅ Issue new access token
    const user = await User.findById(tokenRow.userId);
    if (!user) throw new Error("User not found");

    const newAccessToken = jwt.sign(
      { userId: user._id, email: user.email },
      env.jwt_secret!,
      { expiresIn: "15m" }
    );

    return {
      accessToken: newAccessToken,
    };
  }

  async logout(req: Request) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("No refresh token provided");

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    console.log(refreshTokenHash)

    
    await RefreshToken.deleteOne({ tokenHash: refreshTokenHash });
    return { success: true, message: "Logged out successfully" };
  }
  
  async me(req: Request){
    try {
      if (!req.user) {
        throw new errors.Unauthorized();
      }
  
      const result = {
        success: true,
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          picture: req.user.picture,
        },
      };
      
      return result;
    } catch (error) {
      throw new Error("Error fetching user info")
    }
  }
  
  async update(req: Request){
    const { newUser } = req.body;
    
    try {
  
      const updatedUser = await User.updateOne(
        { email: req.user.email },
        { $set: newUser }
      );
  
      if (updatedUser.matchedCount === 0) {
        throw new Error("User not found")
      }
  
      return {
        message: "User updated successfully",
        result: updatedUser
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw new errors.InternalServerError();
    } 
    
  }
  
  async check(){
    return "Hey there"
  }
}