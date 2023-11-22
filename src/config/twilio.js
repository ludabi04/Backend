import twilio from "twilio";
import { config } from "../config/config.js"


export const twilioClient = twilio(config.twilio.account,config.twilio.token)