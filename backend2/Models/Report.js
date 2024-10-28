import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    name:{ //name of the report
        type: String,
        required: true
    },
    center:{ // wellness center name 
        type:String,
        required:true
    },
    doctor:{ //doctor ID
        type:String,
        required:true,
    },
    PID:{ //PatientID
        type: String,
        required:true
    },
    report:{ //actuall report pdf link
        type:String,
        required: true
    },
    RID:{ //report ID
        type:String,
        required: true
    }
})

const Report = mongoose.model("Report", ReportSchema)

export default Report