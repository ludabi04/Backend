import { cartsService, productsService } from "../index.js";
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
            const result = await this.model.findById(cId);
            return result;
        } catch (error) {
            console.log("error getCartsById", error.message)
            throw new Error("error al obtener el producto");

        }
    }
    
 
    async prodInCarts(cartId, prodId) {
        try {
            let quantity = 0;
            const cartsExist = await cartsService.getCartsById(cartId);
            const productExist = cartsExist.products.find(elm => elm.productId == prodId)

            if (productExist) {
                productExist.quantity += 1
                const result = await this.model.findByIdAndUpdate(cartId, cartsExist, { new: true })
                console.log(result)
            } else {
            const newProdCart = {
                productId: prodId,
                quantity: 1
            }
            const result = cartsExist.products.push(newProdCart)
                console.log("result", result)
                }
        }
 catch (error) {
            console.log("error prodInCarts", error.message)
            throw new Error("error al obtener el producto");  

        }
    }
    
    async prodBycarts(cartId) {
        try {
            console.log("cartID", cartId)
            const prodCart = await this.model.findById(cartId).populate("products");
            return prodCart;
        } catch (error) {
            throw new Error("error en el carrito")
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