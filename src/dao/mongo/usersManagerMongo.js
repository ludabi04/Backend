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
};
