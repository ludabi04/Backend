import { messagesModel } from "./models/chat.model.js";

export class messagesManagerMongo { 
    constructor () {
        this.model = messagesModel;
    }

    
async getMessages() { // aca se puede poner el filtro ()
         try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            throw new Error("error al obtener el producto");

        }
    };
    
async addMessages(messages) {
        try {
            const result = await this.model.create(messages);
            return result;
        } catch (error) {
            throw new Error("error al crear el producto")

        }
    };

async delMessages(id) {
        try {
            const result = await this.model.findOneAndDelete(id); 
            return result;
        } catch (error) {
            throw new Error("error al crear el producto")

        }
    };


async updateMsg(id, newMessage) {
    try {
        const result = await this.model.findByIdAndUpdate(id,  {message:newMessage}); 
            return result;
        } catch (error) {
            throw new Error("error al actualizar mensaje")

        }
    };


};

