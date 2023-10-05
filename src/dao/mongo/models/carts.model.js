import mongoose from "mongoose";


const cartsCollecttion = "carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: String,
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
    code: {
        type: Number,
        
    },
    thumbnail: {

    },
                quantity: Number
            }
        ],
        default:[] 
    }
})



export const cartsModel = mongoose.model(cartsCollecttion, cartsSchema)