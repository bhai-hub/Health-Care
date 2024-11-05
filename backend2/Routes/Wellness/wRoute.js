import express from "express"
import register from "../../Controller/Wellness/Auth.js"
import verify from "../../Controller/Wellness/Verifiy.js"
import addDoc from "../../Controller/Wellness/AddDoc.js"
import report from "../../Controller/Wellness/Addreport.js"

const wRoute = express.Router()

wRoute.post("/register", register)
wRoute.post("/verify/:token", verify)
wRoute.post("/addDoctor/:cid", addDoc)
wRoute.post("/addRep/:CID", report)

export default wRoute