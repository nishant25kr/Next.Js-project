// import User from "@/models/user"
// import nodemailer from "nodemailer"
// import bcrypt from "bcryptjs"

// export const sendEmail = async ({ email, emailtype, userId }: any) => {
//     try {

//         const hashedToken = await bcrypt.hash(userId, toString(), 10)

//         if (emailtype === "VERIFY") {
//             await User.findByIdAndUpdate(userId,
//                 {
//                     verifyToken: hashedToken,
//                     verifyTokenExpiry: Date.now() + 3600000
//                 }
//             )
//         } else {
//             await User.findByIdAndUpdate(userId,
//                 {
//                     forgotPasswordToken: hashedToken,
//                     forgotPasswordTokenExpiry: Date.now() + 3600000
//                 }
//             )
//         }

//         const transporter = nodemailer.createTranspoart({
//                 host: "sandbox.smtp.mailtrap.io",
//                 port: 2525,
//                 auth: {
//                     user: "dbf5eae30efd8a",
//                     pass: "ea3638cea6dd89"
//                 }

//         })

//         const mailOptions = {
//             from:'nishant927472@gmail.com',
//             to:email,
//             subject:emailtype==="VERIFY" ? "verify your email" : "Reset your password",
//             html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
//             or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//             </p>`
//         }

//         const mailresponse = await transporter.sendEmail(mailOptions);
//         return mailresponse;

//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// }


import User from "@/models/user";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
  email,
  emailtype,
  userId,
}: {
  email: string;
  emailtype: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: "nishant927472@gmail.com",
      to: email,
      subject:
        emailtype === "VERIFY"
          ? "Verify your email"
          : "Reset your password",
      html: `
        <p>Click 
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
        here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser: <br />
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Email error:", error);
    throw new Error(error.message);
  }
};
