import mongoose from "mongoose";


const usersCollecttion = "users";

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email:String,
    password:String
})



export const usersModel = mongoose.model(usersCollecttion, usersSchema)