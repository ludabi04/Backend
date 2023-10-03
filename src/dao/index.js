import { ProductManagerFiles } from "./productManagerFiles.js";
import { CartsManagerFiles } from "./cartManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";
import { productsManagerMongo } from "./mongo/productsManagerMongo.js";
import { cartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { messagesManagerMongo } from "./mongo/chatManagerMongo.js";

console.log("dirname: ", path.join(__dirname, "/files"));//Users/lucasbianco/Desktop/Coder/BACKEND/Backend/Backend/src/files

export const productsService = new productsManagerMongo();
export const cartsService = new cartsManagerMongo();
export const chatService = new messagesManagerMongo();



