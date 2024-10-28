import mongoose from "mongoose";

const CenterSchema = new mongoose.Schema({
    name: { // name of the wellness center
        type: String,
        required: true,
        trim: true, // Trim whitespace from name
    },
    Address: { // address of the wellness center
        type: String,
        required: true,
        trim: true, // Trim whitespace from address
    },
    pincode: { // pincode of wellness
        type: Number,
        required: true,
    },
    city: { // city of the wellness center
        type: String,
        required: true,
        trim: true, // Trim whitespace from city
    },
    state: { // state of the wellness center
        type: String,
        required: true,
        trim: true, // Trim whitespace from state
    },
    doctor: { // all the doctors available in the wellness center
        type: [String],
        default: [],
    },
    appointment: { // all the appointments of doctors for wellness center reference
        type: [String],
        default: []
    },
    report: { // all the report IDs for reference for the wellness center
        type: [String],
        default: []
    },
    patient: { // all patient IDs of the respective wellness center
        type: [String],
        default: []
    },
    CID: { // wellness center ID
        type: String,
        required: true,
        trim: true, // Trim whitespace from CID
    }
});

const Center = mongoose.model("Center", CenterSchema);

export default Center;
