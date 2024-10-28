import mongoose from "mongoose";

const forgotSchema = new mongoose.Schema({
    token:{ //token for forgot password
        type: String,
        required: true
    },
    email:{ //email for forgot password
        type: String,
        required: true
    },
    createdAt: { 
        type: Date,
        default: Date.now, // Automatically set the current date when the token is created
        expires: '15m', // Automatically remove the token after 15 minutes
    }
})

const Forgot = mongoose.model("ForgotPassword", forgotSchema)

export default Forgot