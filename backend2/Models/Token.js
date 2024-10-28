import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token:{ //token for email verification
        type: String,
        required: true
    },
    email:{ // email for verification
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the current date when the token is created
        expires: '15m', // Automatically remove the token after 15 minutes
    }
})

const Token = mongoose.model("Token", TokenSchema)

export default Token