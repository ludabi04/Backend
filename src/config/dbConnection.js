import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://ludabi:lu020480@ludabi.wgdvuse.mongodb.net/ecommerceDB?retryWrites=true&w=majority");
        console.log("bbdd conectada");

        
    } catch (error) {
        console.log(`hubo un error al conectar la base de datos:${error.message}`)
    }
}