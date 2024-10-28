import Patient from "../../Models/Patient.js"
import sendEmail from "../../service/mailer.js";

const register = async (req,res) =>{
    const {name , email, phoneNumber, address, pincode, state, city, PID, password, confirmpassword} = req.body 

    try {
        const patient = await Patient.findOne({email});

        if(patient){
            res.status(400).json({message:"Email already existed"})
        }

        if(password !== confirmpassword) res.status(400).json({message:"password doesnt match"});

        let contextHtml = `
        <p>Hello ${name}</p>
        <p><a href="http://localhost:3000/api/patient/verify/"
        `

        await sendEmail(email, subject="verify email", contextHtml)
    } catch (error) {
        
    }
}