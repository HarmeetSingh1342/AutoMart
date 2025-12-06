import nodemailer from "nodemailer";

export async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"AutoMart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your AutoMart Login OTP",
    text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}
