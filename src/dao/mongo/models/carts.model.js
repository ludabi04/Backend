import mongoose from "mongoose";


const cartsCollecttion = "carts";

const cartsSchema = new mongoose.Schema({
    
    products: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            }
        ],
        default:[] 
    }
})



export const cartsModel = mongoose.model(cartsCollecttion, cartsSchema)