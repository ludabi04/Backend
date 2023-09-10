import fs from "fs";

export class CartsManagerFiles{
    constructor (path) {
        this.path = path;
    };

    fileExist() {
        return fs.existsSync(this.path);
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

    async addCart(cartInfo) {
        try {
        
            if (this.fileExist()) { 
                const contenido = await fs.promises.readFile(this.path,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                
                contenidoJson.push(cartInfo);
                await fs.promises.writeFile(this.path, JSON.stringify(contenidoJson,null,"\t"));
                console.log("carrito agregado");
                
        
            } else {
                throw new Error("no es posible guardar el carrito")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


}