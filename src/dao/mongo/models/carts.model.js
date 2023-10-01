import mongoose from "mongoose";


const cartsCollecttion = "carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {   productId: String,
                
            }
        ],
        default:[]
    }
})



export const cartsModel = mongoose.model(cartsCollecttion, cartsSchema)