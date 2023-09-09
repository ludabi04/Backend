import { ProductManagerFiles } from "./productManagerFiles.js";
import { CartsManagerFiles } from "./cartManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

console.log("dirname: ", path.join(__dirname, "/files"));//Users/lucasbianco/Desktop/Coder/BACKEND/Backend/Backend/src/files

export const productsService = new ProductManagerFiles(path.join(__dirname,"files/productos.json"));
export const cartsService = new CartsManagerFiles(path.join(__dirname,"files/carts.json"));