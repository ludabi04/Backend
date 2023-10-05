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
                return carritosTotales;
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

   

    async updateCartsById(cartId, prodId, productExists) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const contenidoJson = JSON.parse(contenido);
            let carrito = await this.getCartsById(cartId)
            let indiceCarrito = contenidoJson.findIndex(cart=> cart.id == carrito[0].id)
            
            let productFiltered = carrito[0].products.findIndex(product=> product.id == prodId)
           
            if(productFiltered === -1){
                productExists.quantity = 1
                contenidoJson[indiceCarrito].products.push(productExists)
            }else{
                contenidoJson[indiceCarrito].products[productFiltered].quantity += 1
            }
            const productsString = JSON.stringify(contenidoJson, null, 2);
            await fs.promises.writeFile(this.path, productsString);
            return console.log("producto actualizado correctamente")
        
        } catch (error) {
            console.log("error", error.message)
        }
    };
}