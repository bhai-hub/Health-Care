import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_KEY;

if (!secret) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

const genToken = async (payload) => {
  try {
    const token = jwt.sign({payload}, secret, { expiresIn: "15m" });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export default genToken;
