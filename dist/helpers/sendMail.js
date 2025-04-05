import { conf } from "../config/conf.js";
import logger from "../utils/logger.js";
import { MailTemplate } from "./OtpMailTemplate.js";
import nodemailer from "nodemailer";
export const sendMail = async (name, mailId, verificationLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: conf.mailId,
                pass: conf.mailPass,
            },
        });
        const template = MailTemplate(name, verificationLink);
        const info = await transporter.sendMail({
            from: `"KNOWVIOFIT" <${conf.mailId}>`,
            to: mailId,
            subject: "OTP Verification - KNOWVIOFIT",
            text: `Hi ${name}, your Verificatin link is here. It's valid for 3 minutes.`,
            html: template,
        });
        // console.log("mail sent", info);
        return info;
    }
    catch (error) {
        const err = error;
        logger.error(err.message);
    }
};
