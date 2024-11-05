import Center from "../../Models/Center.js";
import Token from "../../Models/Token.js";

const verify = async (req, res) => {
    const { token } = req.params;
    const { otp } = req.body;

    try {
        // Find the token in the database
        const veriToken = await Token.findOne({ token });

        // Check if the token exists
        if (!veriToken) {
            return res.status(404).json({ message: "Invalid request: token not found" });
        }

        // Verify the OTP
        if (otp !== veriToken.otp) {
            return res.status(400).json({ message: 'Invalid OTP, please try again' });
        }

        // Prepare to update the center's verification status
        const filter = { email: veriToken.email }; // Query filter for the center
        const update = { $set: { isVerified: true } }; // Update operation

        // Update the center and return the updated document
        const updatedCenter = await Center.findOneAndUpdate(filter, update, {
            new: true, // Return the updated document
            upsert: false, // Do not create a new document if no match is found
        });

        // Check if the center was found and updated
        if (!updatedCenter) {
            return res.status(404).json({ message: "Center not found" });
        }

        // Delete the token after successful verification
        await Token.findOneAndDelete({ token });

        // Send a success response
        res.status(200).json({ message: "Verification successful", updatedCenter });

    } catch (error) {
        console.error("Error during verification:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export default verify;
