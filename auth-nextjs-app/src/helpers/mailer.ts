import nodemailer from 'nodemailer';
import User from "@/models/user"
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailtype, userId }: any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        console.log(email,emailtype,userId);

        if (emailtype === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailtype === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });


        const mailOptions = {
            from: 'nishant25krr@gmail.com',
            to: email,
            subject: emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        console.log("before mailresponse")
        
        const mailresponse = await transport.sendMail(mailOptions);
        console.log("after mailresponse")

        console.log(mailresponse)
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

// import User from "@/models/user";
// import nodemailer from "nodemailer";
// import bcrypt from "bcryptjs";

// export const sendEmail = async ({
//   email,
//   emailtype,
//   userId,
// }: {
//   email: string;
//   emailtype: "VERIFY" | "RESET";
//   userId: string;
// }) => {
//   try {
//     const hashedToken = await bcrypt.hash(userId.toString(), 10);

//     if (emailtype === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000, // 1 hour
//       });
//     } else {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordToken: hashedToken,
//         forgotPasswordTokenExpiry: Date.now() + 3600000,
//       });
//     }

//     const transporter = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS,
//       },
//     });

//     const mailOptions = {
//       from: "nishant927472@gmail.com",
//       to: email,
//       subject:
//         emailtype === "VERIFY"
//           ? "Verify your email"
//           : "Reset your password",
//       html: `
//         <p>Click 
//         <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
//         here</a> to ${emailtype === "VERIFY" ? "verify your email" : "reset your password"}
//         or copy and paste the link below in your browser: <br />
//         ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//         </p>
//       `,
//     };

//     const mailResponse = await transporter.sendMail(mailOptions);
//     return mailResponse;
//   } catch (error: any) {
//     console.error("Email error:", error);
//     throw new Error(error.message);
//   }
// };
