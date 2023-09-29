
import mongoose from "mongoose";


const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        reqquired: true,
        // enums:["Jean", "Remera", "Pantalon", "buzo"]
    },
    thumbnail: {

    }
})

export const productsModel = mongoose.model(productsCollection, productSchema)