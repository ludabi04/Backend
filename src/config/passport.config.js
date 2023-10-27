import passport  from "passport";
import localStrategy from "passport-local";
import { createHash, inValidPassword } from "../utils.js ";
import { usersModel } from "../dao/mongo/models/users.model.js";
import { userService } from "../dao/index.js";

//localStategy: solo usa dos variables username y passwor
export const initializePassport = () => {
    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback: true,
            usernameField:"userEmail", //ahroa username es igual al campo userEmail
        },
        async (req,username,password,done) => {
            const { first_name, last_name, age } = req.body
            try {
                const user = await usersModel.findOne({ email: username });
                if (user) {
                                    console.log("usuario registrado ya");

                    //el usuarioya esta registrado
                    return done(null,false,  { message: 'Usuario no encontrado' });
                }else{
                //el usuario no esta registrado
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email: username,
                    password: createHash(password)
                };
                console.log("nuevo por crear", newUser);
                const userCreated = await userService.addUser(newUser);
                return done(null,userCreated,  { message: 'Usuario creado' });
                    }
            } catch (error) {
                console.log("entró aca");
                return done(error);
            }
        }
    ))
}