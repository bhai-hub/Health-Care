import Center from "../../Models/Center.js";
import Doctor from "../../Models/Doctor.js";
import { hashed } from "../../service/hash.js";
import { v4 as uuidv4 } from "uuid";

const addDoc = async (req, res) => {
    const { cid } = req.params;
    const { name, qualification, phoneNumber, email, specialist, password, confirmpassword } = req.body;

    // Check for missing fields
    if (!name || !qualification || !phoneNumber || !email || !specialist || !password || !confirmpassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if doctor already exists with the same email
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        // Verify password and confirmation match
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password mismatch" });
        }

        // Hash the password and create a new Doctor ID
        const hashedPassword = await hashed(password);
        const did = "D" + uuidv4().replace(/-/g, "").slice(0, 8);

        // Create and save the new Doctor
        const newDoctor = new Doctor({
            name,
            qualification,
            specialist,
            phoneNumber,
            password: hashedPassword,
            email,
            DID: did,
            CID: cid,
        });

        await newDoctor.save();

        // Add the doctor's ID to the center's doctor array
        const filter = { CID: cid };
        const update = { $push: { doctor: newDoctor.DID } };

        const updatedCenter = await Center.findOneAndUpdate(filter, update, {
            new: true,
            upsert: false,
        });

        if (!updatedCenter) {
            return res.status(404).json({ message: "Center not found. Please contact support." });
        }

        res.status(200).json({ message: "Doctor added successfully", updatedCenter });

    } catch (error) {
        console.error("Error during Adding Doctor:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default addDoc;
