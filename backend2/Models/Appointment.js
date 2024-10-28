import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    AID:{ // Apointment ID
        type: String,
        required: true
    },
    PID:{ // Patient ID
        type:String,
        required: true
    },
    CID:{ // wellness center ID
        type: String,
        required: true,
    },
    DID:{ // Doctor ID
        type:String,
        required: true
    },
    date:{ // Date
        type: Date,
        required: true
    }

})

const Appointment = mongoose.model("Appointment", AppointmentSchema)

export default Appointment