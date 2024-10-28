import nodemailer from 'nodemailer'

const sendEmail = async(to, subject, html)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: html,
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export default sendEmail