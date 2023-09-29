import { productsModel } from "./models/products.model.js";

export class productsManagerMongo { 
    constructor () {
        this.model = productsModel;
        
    };

    async addProduct(prodInfo) {
        try {
            const result = await this.model.create(prodInfo);
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al crear el producto")

        }
    };
    async getProducts(productsModel) { // aca se puede poner el filtro ()
         try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al obtener el producto");

        }
     };
    async getProductsById(productId) {
        try {
            const result = await this.model.findOne({_id: productId});
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al obtener el producto");

        }
     }
    async updateProductsById(productId, productUpdate) {
        try {
            const result = await this.model.updateOne({_id: productId}, productUpdate);
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al actualizar el producto");

        }
     }
    async deleteProducts(id) { try {
        const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log("error al eliminar productos")
            throw new Error("error al eliminar el producto");
        }}

    }