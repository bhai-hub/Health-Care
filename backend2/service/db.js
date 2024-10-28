import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.DB

const connectDb = async () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Export connectDb directly
export default connectDb;
