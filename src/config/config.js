import dotenv from "dotenv";
import path from "path";
import { __dirname } from "../utils.js";
import { Command } from "commander"; 

const program = new Command();

//especifico argumentos

program
    .option("--mode <modo>", "modo o entorno de trabajo", "development");

program.parse();
const args = program.opts();
console.log(args)

const envMode = args.mode;

const pathEnv = envMode === "development" ? path.join(__dirname, "./.env.development") : path.join(__dirname, "./.env.production");
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