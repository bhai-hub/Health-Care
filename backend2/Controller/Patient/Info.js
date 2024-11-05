import Patient from "../../Models/Patient.js";

const getInfo = async (req, res) => {
    const { PID } = req.params;

    try {
        // Fetch patient information using the PID
        const patient = await Patient.findOne({ PID });

        // Check if patient was found
        if (!patient) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Prepare user info to send back in response
        res.status(200).json({
            userInfo: {
                PID: patient.PID,
                "user name": patient.name,
                "phone number": patient.phoneNumber,
                email: patient.email,
                Address: patient.address,
                Pincode: patient.pincode,
                city: patient.city,
                state: patient.state,
                WellnessID: patient.center,
                Doctor: patient.doctor,
                report: patient.report, // Make sure report is defined
                appointment: patient.appointment
            }
        });
    } catch (error) {
        console.error("Error fetching patient info:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error", error: error.message }); // Send the error message
    }
};

export default getInfo;
