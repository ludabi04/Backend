import dotenv from "dotenv";
import path from "path";
import { __dirname } from "../utils.js";

const pathEnv = path.join(__dirname, "./.env.development");
dotenv.config({
    path:pathEnv
});


export const config = {
    server:{
        secretSession: process.env.SECRET_SESSION,
        port: process.env.PORT
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    github:{
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
};
console.log("config", config)