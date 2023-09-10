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
                const contenido = await fs.promises.readFile(this.path,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                
                contenidoJson.push(prodInfo);
                await fs.promises.writeFile(this.path, JSON.stringify(contenidoJson,null,"\t"));
                console.log("producto agregado");
                
        
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
                const product = products.filter(i=> i.id === productId)
                if (!product) {
                    throw new Error("el producto no existe");
                } else {return product}
                
            } else {
                throw new Error("no es posible leer el archivo")
            }
        }
            catch (error) { 
                console.log(error.message);
                throw error;
            
        }
    };

}