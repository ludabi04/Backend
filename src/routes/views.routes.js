import { Router } from "express";
import { productsService } from "../dao/index.js";
import { chatService } from "../dao/index.js";
import { cartsService } from "../dao/index.js";




const router = Router();


//routes 

router.get("/", async (req, res) => {
    try { 
        const prodTotal = await productsService.getProducts();
        const limitTotal = prodTotal.length
        const products = await productsService.getProductsLimit(5, 1);
        const dataR = { productos: products }
        const dataProducts = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevPage, // //Link directo a la página previa (null si hasPrevPage=false)
            nextLink: products.nextPage // // Link directo a la página siguiente (null si hasNextPage=false)

        }
        console.log("data rece", dataProducts)
        res.render("home", {dataProducts, style: "home.css"})
    } catch (error) {
        
    }
});


// router.get("/", async (req, res) => {
//     const {limit=4, page=1} = req.query
//     const query = {}
//     const options = {
//                 limit, 
//                 page, 
//                 lean:true
//             }
//     const result = await productsService.getProductsLimit(query, options);
//     const dataProducts = {
//                 status: "success",
//                 payload: result.docs,
//                 totalPages: result.totalPages,
//                 prevPage: result.prevPage,
//                 nextPage: result.nextPage,
//                 page: result.page,
//                 // hasPrevPage: result.hasPrevPage,
//                 // hasNextPage: result.hasNextPage,
//                 // prevLink: result.prevPage, // //Link directo a la página previa (null si hasPrevPage=false)
//                 // nextLink: result.nextPage // // Link directo a la página siguiente (null si hasNextPage=false)

//             }

//     const dataProd = { productos: dataProducts.payload }
//     const data = dataProd.productos
//             console.log("dataProducts", data)
//         res.render("home", {data, style: "index.css"})
// });

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productsService.getProducts();
        const data = { productos: products }
        res.render("realTimeProducts", {...data, style: "realtimeproducts.css"})
    } catch (error) {
        
    }
});
router.get("/chat", async (req, res) => {
    try {
        const messages = await chatService.getMessages();
        const data = { messages: messages }
        res.render("chat", { ...data, style: "realtimeproducts.css" })
    } catch (error) {
        
    }
});

router.get("/carts", async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        const data = { carts: carts }
        res.render("carts", { ...data, style: "realtimeproducts.css" })
    } catch (error) {
        
    }
});

router.get("/signup", async (req, res) => {
    try {
       
        res.render("signupView")
    } catch (error) {
        
    }
});
router.get("/profile", async (req, res) => {
    try {
       
        res.render("profileView")
    } catch (error) {
        
    }
});
router.get("/login", async (req, res) => {
    try {
       
        res.render("loginView")
    } catch (error) {
        
    }
});


// //ruta para crear una cookie
// router.get("/set-cookie", (req, res) => {
//     // res.cookie("nombreCookie", "valorCookie", { maxAge: 5000 }).send("cookie creada");
//     res.cookie("nombreCookie", "valorCookie").send("cookie creada");

//     //cookie(nombreCookie, valoorCookie, options)
// });

// //ruta para leer las cookies que vienen del cliente

// router.get("/get-cookies", (req, res) => {
//     console.log(req.cookies);
//     res.send("cookies recibidas")
// });

// //ruta para eliminar las cookies

// router.get("/delete-cookies", (req, res) => {
//     res.clearCookie("nombreCookie").send("la cookie fue eliminada")
// })

// //ruta cookie firmada

// router.get("/set.signedCookie", (req, res) => {
//     res.cookie("userData", { email: "pepe@gmail.com", role: "user" }, { signed: true }).send("cookie creada")
// });

// //endpoint que lee las cookies firmadas
// router.get("/get.signedCookie", (req, res) => {
//     console.log(req.signedCookies)
//     res.send("cookies recibidas")
// });
// router.get("/create-cookie", (req, res) => {
//     console.log(req.cookies)
//     res.send("cookies recibidas!")
// });






export {router as viewsRouter}