import Center from "../../Models/Center.js"
import Doctor from "../../Models/Doctor.js"
import { comparePassword } from "../../service/hash.js"
const login = async (req,res)=>{

    const {DID, password} = req.body

    if(!DID || !password){
        res.status(400).json({message:"All field are required"})
    }

    try {
        
        const doctor = await Doctor.findOne({DID})

        if(!doctor) res.status(404).json({message:"Not found! try again"})
        
        const verifpass = await comparePassword(password, doctor.password)
        if(!verifpass) res.status(400).json({message:"password invalid, Enter the right password"})
        
        const wellness = await Center.findOne({CID: doctor.CID})
        const data={
            name: doctor.name,
            "phone Number": doctor.phoneNumber,
            "email": doctor.email,
            "Wellness center": wellness.name,
            "speciality": doctor.specialist,
            "DID":doctor.DID

        }
        res.status(201).json({message:"Successfully", data})
        

    } catch (error) {
        res.status(500).json({message:"Error in server"})
    }
}

export default login