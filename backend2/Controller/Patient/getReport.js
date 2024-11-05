import Patient from "../../Models/Patient.js";
import Report from "../../Models/Report.js";

const report = async (req, res) => {
  const { PID } = req.params;

  try {
    // Step 1: Find the patient by PID
    const patient = await Patient.findOne({ PID });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Step 2: Find reports for the patient
    const reports = await Report.find({ PID });
    if (reports.length === 0) {
      return res.status(200).json({ message: "No reports found", reports: [] });
    }

    // Step 3: Return the reports
    res.status(200).json({
      message: "Reports found",
      reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default report;
