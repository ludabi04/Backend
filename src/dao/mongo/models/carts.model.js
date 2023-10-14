import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartsCollecttion = "carts";

const cartsSchema = new Schema({
    
    products: {
        type: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
});



export const cartsModel = mongoose.model(cartsCollecttion, cartsSchema)