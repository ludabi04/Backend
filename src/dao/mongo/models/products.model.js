
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


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
    code: {
        type: Number,
        
    },
    thumbnail: {

    }
})

productSchema.plugin(mongoosePaginate)



export const productsModel = mongoose.model(productsCollection, productSchema)