import path from "path";
import { fileURLToPath } from "url";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("__dirname", __dirname) //Users/lucasbianco/Desktop/Coder/BACKEND/Backend/Backend/src

//__dirname va a ser la ruta de la carpeta donde esta la carpeta
