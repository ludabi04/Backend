import fs from "fs";

export class ProductManagerFiles {
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

}