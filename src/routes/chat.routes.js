import { Router } from "express";
import { chatService } from "../dao/index.js";

const router = Router();




router.get("/", async (req, res) => {
    try {
        const messages = await chatService.getMessages();
        res.json({ message: "mensaje agregado", data: messages });
    } catch (error) {
        
    }
});


router.post("/", async (req, res) => {
    try {
        const chatAdded = await chatService.addMessages(messages);
        res.json({ status: "succes", data: chatAdded })
    } catch (error) {
        
    }
});

export { router as chatRouter };