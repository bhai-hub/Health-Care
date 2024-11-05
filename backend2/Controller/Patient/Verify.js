import Patient from "../../Models/Patient.js";
import Token from "../../Models/Token.js";
import sendEmail from "../../service/mailer.js";
import genToken from "../../service/token.js";

const verify = async (req, res) => {
    const { token } = req.params; // Extract token from URL parameters
    const { otp } = req.body; // Extract OTP from request body

    try {
        // Find the token document in the database
        const conToken = await Token.findOne({ token });

        // Check if the token exists
        if (!conToken) {
            return res.status(404).json({ message: "Token not found" });
        }

        // Check if the OTP is valid
        if (otp !== conToken.otp) {
            return res.status(400).json({ message: 'Invalid OTP, please try again' });
        }

        // Update the patient document to mark them as verified
        const filter = { email: conToken.email }; // Query filter for the patient
        const update = { $set: { isVerified: true } }; // Update operation

        const updatedPatient = await Patient.findOneAndUpdate(filter, update, {
            new: true, // Return the updated document
            upsert: true, // Create a new document if no match is found (this is optional)
        });

        // Optionally check if the patient was updated
        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Delete the token after successful verification
        await Token.findOneAndDelete({ token });

        const html = `
        <p> Welcome aboard ${updatedPatient.name} </p>
        <p>Your email is verified! Your Patient Id is:<b> ${updatedPatient.PID}</b></p>
        <p>Regards,</p>
        <p>Medicare</p>
        `

        await sendEmail(updatedPatient.email, "verified successfully", html)

        // Respond with success message
        res.status(200).json({ message: "Verification successful", updatedPatient });

    } catch (error) {
        console.error("Error during verification:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const generateOTP = (length = 6) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Appends a random digit (0-9)
    }
    return otp;
};

const verificationEmail = async(req,res) =>{

    const {email2} = req.body

    try {
        const token = await Token.findOne({email: email2})
        if(token) res.status(200).json({message: "please try again"})
        
        const patient = await Patient.findOne({email: email2})
        if(!patient) res.status(400).json({message:"Email not found, try again"})

        const newToken = await genToken(patient.PID)
        const otp = generateOTP()
        const email= patient.email
        const subject= "Verify email"
        const html = `
         <p>Hello ${patient.name},</p>
            <p>Please verify your email by clicking on the link below:</p>
            <p><a href="http://localhost:5000/api/patient/verify/${newToken}">Verify Email</a></p>
            <p>OTP: ${otp}</p>
        `

        const veriToken = new Token({email, token: newToken, otp})

        await veriToken.save()

        await sendEmail(email, subject, html)

        res.status(200).json({message:"new verification email sent!"})

    } catch (error) {
        res.status(500).json({error})
    }

}


export {verify, verificationEmail};
