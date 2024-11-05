import Center from "../../Models/Center.js";
import { v4 as uuidv4 } from "uuid";
import genToken from "../../service/token.js";
import { hashed } from "../../service/hash.js";
import sendEmail from "../../service/mailer.js";
import Token from "../../Models/Token.js";

const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Appends a random digit (0-9)
  }
  return otp;
};

const register = async (req, res) => {
  const {
    name,
    address,
    pincode,
    city,
    state,
    phoneNumber,
    password,
    confirmpassword,
    email,
  } = req.body;

  // Input validation
  if (!name || !address || !pincode || !city || !state || !phoneNumber || !password || !confirmpassword || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if center already exists
    const center = await Center.findOne({ email });
    if (center) {
      return res.status(400).json({ message: "Hospital already exists!" });
    }

    // Generate unique center ID and token
    const cid = "C" + uuidv4().replace(/-/g, "").slice(0, 8);
    const token = await genToken(cid);
    const hashedpassword = await hashed(password);
    const otp = generateOTP();

    // Check for existing token and create a new one if not present
    let newToken = await Token.findOne({ email });
    if (!newToken) {
      newToken = new Token({ email, token, otp });
      await newToken.save();
    }

    // Prepare email content
    const contextHtml = `
      <p>Hello ${name},</p>
      <p>Thank you for joining us.</p>
      <p>Please verify your email by clicking on the link below and entering the OTP:</p>
      <p><a href="http://localhost:5000/api/wellness/verify/${token}">Verify Email</a></p>
      <p>OTP: ${otp}</p>
    `;

    // Send verification email
    await sendEmail(email, "Verify Email", contextHtml);

    // Create new center
    const newCenter = new Center({
      name,
      address,
      email,
      phoneNumber,
      pincode,
      city,
      state,
      CID: cid,
      password: hashedpassword,
    });

    await newCenter.save();

    // Send success response
    res.status(200).json({ message: "Registration successful, verify email!" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default register;
