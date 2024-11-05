import Patient from "../../Models/Patient.js";
import sendEmail from "../../service/mailer.js";
import { v4 as uuidv4 } from "uuid";
import Token from "../../Models/Token.js";
import genToken from "../../service/token.js";
import { hashed, comparePassword } from "../../service/hash.js";

const generateOTP = (length = 6) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Appends a random digit (0-9)
    }
    return otp;
};

let register = async (req, res) => {
    const {
        name,
        email,
        phoneNumber,
        address,
        pincode,
        state,
        city,
        password,
        confirmpassword,
        DOB
    } = req.body;

    try {
        // Check if patient already exists
        const patient = await Patient.findOne({ email });
        if (patient) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Generate unique Patient ID and Token
        const pid = "P" + uuidv4().replace(/-/g, '').slice(0, 8);
        const token = genToken(pid);
        const hashpassword = await hashed(password);

        // Register new patient
        const newPatient = new Patient({
            email,
            password: hashpassword,
            DOB,
            address,
            pincode,
            state,
            city,
            PID: pid, // Use generated PID
            phoneNumber,
            name
        });
        await newPatient.save();

        const otp = generateOTP();

        // Check for existing Token and create a new one if not present
        let newToken = await Token.findOne({ email });
        if (!newToken) {
            newToken = new Token({ email, token, otp });
            await newToken.save();
        }

        // Prepare email context
        const contextHtml = `
            <p>Hello ${name},</p>
            <p>Please verify your email by clicking on the link below:</p>
            <p><a href="http://localhost:3000/api/patient/verify/${token}">Verify Email</a></p>
            <p>OTP: ${otp}</p>
        `;

        // Send verification email
        await sendEmail(email, "Verify Email", contextHtml);

        // Send success response
        res.status(200).json({ message: "Registration successful. Verification email sent." });

    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Registration failed. Please try again later." });
    }
};

let Login = async (req, res) => {
    const { PID, password } = req.body;

    try {
        const patient = await Patient.findOne({ PID });

        if (!patient) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await comparePassword(password, patient.password);

        if (!isPasswordValid) return res.status(401).json({ message: 'Incorrect password' });

        res.status(200).json({
            message: "Login successful",
            patient: {
                username: patient.name,
                email: patient.email,
                pid: patient.PID
            }
        });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Login failed. Please try again later." });
    }
};

export { register, Login };
