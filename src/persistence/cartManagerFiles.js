import fs from "fs";

export class CartsManagerFiles{
    constructor (path) {
        this.path = path;
    };

    fileExist() {
        return fs.existsSync(this.path);
    };

    async addCart(cartInfo) {
        try {
        
            if (this.fileExist()) { 
                const contenido = await fs.promises.readFile(this.path,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                const carritosTotales = contenidoJson.length + 1
                contenidoJson.push({"id" : carritosTotales, ...cartInfo});
                await fs.promises.writeFile(this.path, JSON.stringify(contenidoJson,null,"\t"));
                console.log("carrito agregado");
            } else {
                throw new Error("no es posible guardar el carrito")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async getCarts() {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(contenido);
                return carts;
            } else {
                throw new Error("no se pudieron obtener los carritos")
            }
        }
            catch (error) { 
                console.log(error.message);
                throw error;
            
        }
    };

    async getCartsById(cId) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(contenido);
                const cart = carts.filter(i=> i.id === cId)
                if (!cart) {
                    throw new Error("el producto no existe");
                } else {return cart}
                
            } else {
                throw new Error("no es posible leer el archivo")
            }
        }
            catch (error) { 
                console.log(error.message);
                throw error;
            
        }
    };

    async addProductInCart(cartId, productExist, prodId) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const carts = JSON.parse(contenido); 
            let productIndex = carts.findIndex(prod => prod.id === cartId)
            console.log("prod index", productIndex)
            const objeto = carts[productIndex];
            const productoObjeto = objeto.products
            productoObjeto.push({"quantity" : 1, ...productExist})            
            
        } catch (error) {
            throw error
        }
    };

    // async updateCartsById(cartId, productId, productExists) {
    //     try {
    //         const contenido = await fs.promises.readFile(this.path, "utf-8");
    //         const contenidoJson = JSON.parse(contenido);
    //         let productIndex = contenidoJson.findIndex(prod => prod.id === productId)
    //         console.log("productIndex" + productIndex    )
    //         if (productIndex === -1) {
    //             return console.log("producto no encontrado")
    //         }
    //         contenidoJson[productIndex] = { ...contenidoJson[productIndex], ...productUpdate }
    //         const productsString = JSON.stringify(contenidoJson, null, 2);
    //         await fs.promises.writeFile(this.path, productsString);
    //         return console.log("producto actualizado correctamente")
        
    //     } catch (error) {
    //         console.log("error", error.message)
    //     }
    };
