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
    async getProducts() { // aca se puede poner el filtro ()
         try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al obtener el producto");

        }
     };
    async getProductsById(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al obtener el producto");

        }
     }
    async updateProductsById(productId, productUpdate) {
        try {
            const result = await this.model.updateOne({ _id: productId, productUpdate });
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al actualizar el producto");

        }
     }
    async deleteProducts(dato) {
        try {
        const result = await this.model.findByIdAndDelete(dato);
            return result;
        } catch (error) {
            console.log("error al eliminar productos")
            throw new Error("error al eliminar el producto");
        }
    }
    
    async getProductsPaginate(filtro) {
        try {
            const result = await productsModel.aggregate([
            //1 etapa(stage) filtrar
                {
                    $match: { title: `${filtro}` } 
                }
            ]);
            return result
            console.log("resultado", result)
        } catch (error) {
            console.log("error de paginado", error.message)   
        } 
    }

    async getProductsLimit() { // aca se puede poner el filtro ()
        try {
            const result = await productsModel.paginate();
        
            const dataProducts = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevPage, // //Link directo a la página previa (null si hasPrevPage=false)
                nextLink: result.nextPage // // Link directo a la página siguiente (null si hasNextPage=false)

            }
             console.log("result paginado", dataProducts)
            return dataProducts;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al obtener el producto");

        }
     };

    }