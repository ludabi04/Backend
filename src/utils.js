import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("__dirname", __dirname) //Users/lucasbianco/Desktop/Coder/BACKEND/Backend/Backend/src

//__dirname va a ser la ruta de la carpeta donde esta la carpeta

const PRIVATE_KEY = "ldb";

export const generateToken = (user) => {
    const token = jwt.sign({ name: user.name, email: user.email }, PRIVATE_KEY, { expiresIn: "24h" })
    return token;
}
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
};

export const inValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
}
