import { cartsModel } from "./models/carts.model.js";

export class cartsManagerMongo { 
    constructor () {
        this.model = cartsModel;
    }

    async addCart(...cart) {
        try {
            const result = await this.model.create({products: {cart}} );
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al crear el carroooo")

        }
    };
    async getCarts() { // aca se puede poner el filtro ()
         try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al obtener el producto");

        }
     };
    async getCartsById(cId) {
        try {
            const result = await this.model.findOne({_id: cId});
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al obtener el producto");

        }
     }
    async updateCartById(cartId, prodId, productExists) {
        try {
            const result = await this.model.updateOne({ _id: cartId, prodId, productExists });
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al actualizar el producto");

        }
     }
    async deleteCart(dato) {
        try {
        const result = await this.model.findByIdAndDelete(dato);
            return result;
        } catch (error) {
            console.log("error al eliminar productos")
            throw new Error("error al eliminar el producto");
        }}

    } 