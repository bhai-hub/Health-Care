import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name: {  // name of the patient
        type: String,
        required: true,
        trim: true, // Trim whitespace from name
    },
    DOB: { // date of birth of patient
        type: String,
        required: true,
    },
    Address: { // address of patient
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
    center: { // CIDs for past references
        type: [String],
        default: [],
    },
    doctor: { // DIDs for reference
        type: [String],
        default: [],
    },
    appointment: { // AIDs for appointments
        type: [String],
        default: [],
    },
    report: { // RIDs for past reports
        type: [String],
        default: [],
    },
    PID: { // patient ID
        type: String,
        required: true,
        trim: true, // Trim whitespace from PID
    }
});

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
