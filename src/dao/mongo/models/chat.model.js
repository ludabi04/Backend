import mongoose from "mongoose";


const chatCollecttion = "messages";

const messagesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})



export const messagesModel = mongoose.model(chatCollecttion, messagesSchema)