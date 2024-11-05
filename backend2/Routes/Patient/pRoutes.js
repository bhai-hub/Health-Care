import express from 'express';
import {Login, register} from '../../Controller/Patient/Auth.js';
import {verificationEmail, verify} from '../../Controller/Patient/Verify.js';
import getInfo from '../../Controller/Patient/Info.js';
import report from '../../Controller/Patient/getReport.js';

const router = express.Router();

// Define your routes here
router.post('/register', register);
router.post(`/verify/:token`, verify)
router.post("/login", Login)
router.post("/reverify", verificationEmail)


router.get("/report/:PID", report)
router.get("/:PID", getInfo)
export default router;
