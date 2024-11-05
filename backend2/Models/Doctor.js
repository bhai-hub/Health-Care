import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name: { // name of the doctor
        type: String,
        required: true,
        trim: true, // Trim whitespace from name
    },
    qualification: { // qualification
        type: String,
        required: true,
        trim: true, // Trim whitespace from qualification
    },
    specialist: { // speciality
        type: String,
        required: true,
        trim: true, // Trim whitespace from specialty
    },
    phoneNumber: { // phone number
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: { // official email
        type: String,
        required: true,
        trim: true, // Trim whitespace from email
        unique: true, // Ensure email is unique
    },
    CID: { // wellness center ID
        type: String,
        required: true,
        trim: true, // Trim whitespace from CID
    },
    Patient: { // list of patient ID
        type: [String],
        default: [],
    },
    appointment: { // Appointment ID
        type: [String],
        default: []
    },
    DID: { // Doctor ID
        type: String,
        required: true,
        trim: true, // Trim whitespace from DID
    }
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
