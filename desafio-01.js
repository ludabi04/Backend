const fs = require("fs")

class ProductManager {
    constructor (path) {
        this.path = path;
    
}
    fileExist() {
        return fs.existsSync(this.path);
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


    async updateProduct(id, product) {
        try {
            const contenido = await fs.promises.readFile(this.path,"utf-8");
            const contenidoJson = JSON.parse(contenido);
            let productIndex = contenidoJson.findIndex(prod => prod.id == id)
            if (productIndex === -1) {
                return console.log("producto no encontrado")
            }
            if (!product.id ) {
                return console.log("no se puede moficar este id")
            }
            contenidoJson[productIndex] = { ...contenidoJson[productIndex], ...product }
            const productsString = JSON.stringify(contenidoJson, null,2);
            await fs.promises.writeFile(this.path, productsString);
            return console.log("producto actualizado correctamente")
        
        } catch (error) {
            console.log("error", error.message)
        }
    }

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
};

const operaciones = async () => {
        try {
            const manager = new ProductManager("./productos.json");
            const prod = await manager.getProducts();
            console.log(prod)
            let newId;
                if (prod.length == 0) {
                    newId = 1
                } else {
                    newId= prod[prod.length - 1].id + 1 
                }
            await manager.addProduct({ id: newId, title: "Zapatillas", description: "Zapatilla suela blanca", price: 100, thumbnail: "https://acdn.mitiendanube.com/stores/871/214/products/4428_ma_v2_0008_4434_ngr_v2-68bc3cb59eee94d9d415674506252590-1024-1024.webp", code: 1512, stock: 50 });
            await manager.updateProduct(3, { id: 3, title: "Zapatillasaaaaaaas", description: "Zapatilla suela blanca", price: 100, thumbnail: "https://acdn.mitiendanube.com/stores/871/214/products/4428_ma_v2_0008_4434_ngr_v2-68bc3cb59eee94d9d415674506252590-1024-1024.webp", code: 1512, stock: 50 });
            await manager.deleteProducts(6)
        } catch (error) {
            console.log(error.message)
        }
}
    operaciones()
      