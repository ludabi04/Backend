import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo {
    constructor () {
        this.model = usersModel;
        
    }
    async addUser(userInfo) {
        try {
            const result = await this.model.create(userInfo);
            console.log("resultado", result)
            return result;
        } catch (error) {
            console.log("error al obtener prodcutos", error.message)
            throw new Error("error al crear el producto")

        }
    };

    async getUsers() {
        try {
            const usuarios = await this.model.find()
            // console.log("usuarios q estan", usuarios)
            return usuarios;
        } catch (error) {
            throw new Error ("usuario no encontrado")
        }
    }
};