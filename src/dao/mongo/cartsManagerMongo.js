import { cartsModel } from "./models/carts.model.js";

export class cartsManagerMongo { 
    constructor () {
        this.model = cartsModel;
    }

    async addCart(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) { 
            console.log("error al agregar el carro", error.message)
            throw new Error("error al crear el carroooo")

        }
    };
    async getCarts() { // aca se puede poner el filtro ()
         try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("error al obtener el carro", error.message)
            throw new Error("error al obtener el carro");

         }
     };
    async getCartsById(cId) { 
        try {
            const result = await this.model.findOne({_id: cId});
            return result; 
        } catch (error) {
            console.log("error getCartsById", error.message)
            throw new Error("error al obtener el producto");  

        }
    }
    
 
    async prodInCarts(cartId, prodId) { 
        try {
            const cart = await this.model.findById(cartId);
            cart.products.push(prodId);
            const carrUpdated = await this.model.findByIdAndUpdate(cartId, cart, {new:true})
            

            return carrUpdated; 
        } catch (error) {
            console.log("error prodInCarts", error.message)
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