import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name: {  // name of the patient
        type: String,
        required: true,
        trim: true, // Trim whitespace from name
    },
    password: {
        type: String,
        required: true,
    },
    DOB: { // date of birth of patient
        type: String,
        required: true,
    },
    address: { // address of patient
        type: String,
        required: true,
        trim: true, // Trim whitespace from address
    },
    phoneNumber: { // mobile number of patient
        type: Number,
        required: true,
    },
    email: { // email id of patient
        type: String,
        required: true,
        trim: true, // Trim whitespace from email
    },
    pincode: { // pincode of patient
        type: Number,
        required: true,
    },
    city: { // city of patient
        type: String,
        required: true,
        trim: true, // Trim whitespace from city
    },
    state: { // State of patient
        type: String,
        required: true,
        trim: true, // Trim whitespace from state
    },
    PID: { // patient ID
        type: String,
        required: true,
        trim: true, // Trim whitespace from PID
    },
    isVerified:{
        type: Boolean,
        default: false
    }
});

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
