import Center from "../../Models/Center.js";
import Patient from "../../Models/Patient.js";
import Report from "../../Models/Report.js";
import { v4 as uuidv4 } from "uuid";

const report = async (req, res) => {
    const { CID } = req.params;
    const { PID, name, reportContent, DID } = req.body;

    try {
        // Check if the patient and wellness center exist
        const patient = await Patient.findOne({ PID });
        const wellnessCenter = await Center.findOne({ CID });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        if (!wellnessCenter) {
            return res.status(404).json({ message: "Invalid request - Center not found" });
        }

        // Generate a unique report ID
        const rid = "R" + uuidv4().replace(/-/g, "").slice(0, 8);

        // Create and save the new report
        const newReport = new Report({
            name,
            PID,
            DID,
            RID: rid,
            report: reportContent,
            CID
        });
        await newReport.save();

        // Update Patient and Center documents with the new report ID
        await Patient.findOneAndUpdate(
            { PID },
            { $push: { report: newReport.RID } },
            { new: true, upsert: false }
        );

        await Center.findOneAndUpdate(
            { CID },
            { $push: { report: newReport.RID } },
            { new: true, upsert: false }
        );

        // Send a success response
        res.status(200).json({ message: "Report uploaded successfully" });

    } catch (error) {
        console.error("Error during report creation:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default report;
