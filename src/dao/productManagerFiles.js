import fs from "fs";

export class ProductManagerFiles {
    constructor (path) {
        this.path = path;
    }
    fileExist() {
        return fs.existsSync(this.path);
    }

    async addProduct(prodInfo) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.path, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                // const productosTotales = contenidoJson.length+1
                contenidoJson.push({...prodInfo})
                await fs.promises.writeFile(this.path, JSON.stringify(contenidoJson, null, "\t"));
                return console.log("producto agregado correctamente", prodInfo);
            } else {
                throw new Error("no es posible guardar el producto")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async getProducts() {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.path, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                return contenidoJson;
            } else {
                throw new Error("no es posible leer el archivo")
            }
        }
        catch (error) {
            console.log(error.message);
            throw error;
            
        }
    };

    async getProductsById(productId) {
        try {
            if (this.fileExist()) {
                const contenido = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(contenido);
                const product = products.filter(i => i.id === productId)
                if (!product) {
                    throw new Error ("el producto no existe")
                } else {
                    return product
                } 
                
            } else {
                throw new Error("no es posible leer el archivo")
            }
        }
        catch (error) {
            console.log(error.message);
            throw error;
            
        }
    };

    async updateProductsById(productId, productUpdate) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const contenidoJson = JSON.parse(contenido);
            let productIndex = contenidoJson.findIndex(prod => prod.id === productId)
            console.log("productIndex" + productIndex    )
            if (productIndex === -1) {
                return console.log("producto no encontrado")
            }
            contenidoJson[productIndex] = { ...contenidoJson[productIndex], ...productUpdate }
            const productsString = JSON.stringify(contenidoJson, null, 2);
            await fs.promises.writeFile(this.path, productsString);
            return console.log("producto actualizado correctamente")
        
        } catch (error) {
            console.log("error", error.message)
        }
    };

    async deleteProducts(id) {
        try {
            const contenido = await fs.promises.readFile(this.path,"utf-8");
            const contenidoJson = JSON.parse(contenido);
            let productIndex = contenidoJson.findIndex(prod => prod.id == id)
            if (productIndex === -1) {
                return console.log("producto no encontrado")
            }
            contenidoJson.splice(productIndex, 1)
            const productsString = JSON.stringify(contenidoJson, null, 2);
            await fs.promises.writeFile(this.path, productsString);
            return console.log("producto eliminado correctamente")
        } catch (error) {
            console.log("error", error.message)
        }
    }

    

}