import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo {
    constructor () {
        this.model = usersModel;
        
    }
    async addUser(userInfo) {
        try {
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            throw new Error("error al agregar usuario")

        }
    };

    async getUsers() {
        try {
            const usuarios = await this.model.find()
            return usuarios;
        } catch (error) {
            throw new Error ("usuario no encontrado")
        }
    }
};
