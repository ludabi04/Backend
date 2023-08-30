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

getProductById(id){
        //Traigo los productos
        let products = this.getProducts()
        //Hago el filter para traer solamente el producto que coincida con el id pasado por parámetro
        let productFiltered = products.filter(prod=> prod.id == id)
        //Devuelvo productFiltered[0] ya que es un array con un solo dato 
        return productFiltered[0]
}
    
    
updateProduct(id, productUpdated){
        //Traigo los productos
        let products = this.getProducts()
        
        //Recorro el array de productos
        let productsUpdated = products.map(prod=>{
            //Si encuentro ese producto, guardo los nuevos datos y le agrego el id
            if(prod.id == id) {
                prod = productUpdated
                prod.id = id
            }
            return prod
        })
        //Escribo el archivo con todos los productos (con la modificación)
        this.writeFile(productsUpdated)
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
            await manager.product.updateProduct,(2, {id: 34, title: "Zapatillas", description: "Zapatilla suela blanca", price: 100, thumbnail: "https://acdn.mitiendanube.com/stores/871/214/products/4428_ma_v2_0008_4434_ngr_v2-68bc3cb59eee94d9d415674506252590-1024-1024.webp", code: 1512, stock: 50 });
        } catch (error) {
            console.log(error.message)
        }
}
    operaciones()
      
    //     //debe agregar un producto al arreglo de productos inicial: - validar que no se repita el campo "code" y que todos los campos sean obligatorios.
    //     //Al agregarlo debe crearse con un id autoincrementable
    //     let newId;
    //     if (this.products.length == 0) {
    //         newId = 1
    //     } else {
    //         newId = this.products[this.products.length - 1].id + 1
    //     }
        
        
    //     const nuevoProducto = {
    //         id: newId,
    //         title,
    //         description,
    //         price,
    //         thumbnail,
    //         code,
    //         stock
    //     }
        

    //     if (!title || !description || !price || !thumbnail || !code || !stock) {
    //         console.log("faltan datos")
    //     } else {
    //         const codigoUnico = this.products.find(cod => cod.code === code);
    //         if (!codigoUnico) {
    //             this.products.push(nuevoProducto)
    //             console.log(`el codigo es unico ${code}`);
    //         } else {
    //             console.log(`el codigo NO es unico ${code}`)
    //         }
    //     }
    // }
    // 
    // getProductsById(id) {
    //     //debe buscar en el array el producto que coicida con el id, en caso de que no coincida con el id buscado, devolver por consola el error "Not Found"
    //     const searchById = this.products.find(det => det.id === id)
    //     if (!searchById) {
    //         console.log("Not Found")
    //     } else {
    //         console.log(`EL ID ${id} BUSCADO ARROJÓ LOS SIGUIENTES DATOS: \n TITLE: ${searchById.title} \n DESCRIPTION: ${searchById.description} \n PRICE: ${searchById.price} \n THUMBNAIL: ${searchById.thumbnail} \n CODE: ${searchById.code} \n STOCK: ${searchById.stock}`)
    //     }

    // }



// const prodManager = new ProductManager();


// // prodManager.getProducts()
// prodManager.addProduct("Zapatillas", "Zapatilla suela blanca",100, "https://acdn.mitiendanube.com/stores/871/214/products/4428_ma_v2_0008_4434_ngr_v2-68bc3cb59eee94d9d415674506252590-1024-1024.webp",1512, 50 )
// prodManager.addProduct("Remera", "Remera escote V",null, "https://acdn.mitiendanube.com/stores/001/218/661/products/28731-13-11-06138e4847ab5b419216909083565374-1024-1024.jpg",1068, 50 )
// prodManager.addProduct("Jean", "Jean chupin",250, "https://bensimon.com.ar/media/catalog/product/cache/936ae7ac83a4150e0e7d4b14746c4c07/4/7/47176_01_04_6.jpg",2032, 10 )
// prodManager.addProduct("Trench", "Trench hombre", "https://www.riseltd.com/uploads/picture/image/3275/AB230003-1.jpg",1023, 50 )
// prodManager.addProduct("Buzo", "Buzo hombre",null, "https://img.segmentify.com/s/fit-in/720x720/filters:fill(FFFFFF)/images.puma.net/images/535660/67/mod01/fnd/ARG/",2001, 10 )

// prodManager.getProducts();
// prodManager.getProductsById(2)