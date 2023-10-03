import mongoose from "mongoose";


const cartsCollecttion = "carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: String,
                title: String, 
                description: String,
                price: Number,
                status: Boolean,
                stock: Number,
                category: String,
                thumbnail: String     
            }
        ],
        default:[]
    }
})



export const cartsModel = mongoose.model(cartsCollecttion, cartsSchema)