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
            usernameField: "userEmail", //ahroa username es igual al campo userEmail
        },
        async (req, username, password, done) => {
            const { first_name, last_name, age } = req.body
            try {
                const user = await usersModel.findOne({ email: username });
                if (user) {
                    console.log("usuario registrado ya");

                    //el usuarioya esta registrado
                    return done(null,false);
                } else {
                    //el usuario no esta registrado
                    const newUser = {
                        first_name,
                        last_name,
                        age,
                        email: username,
                        password: createHash(password)
                    };
                    const userCreated = await userService.addUser(newUser);
                    return done(null, userCreated);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField: "userEmail", //ahroa username es igual al campo userEmail
            passwordField: "passUser"
        },
        async (username, password, done) => {
            console.log("usuario", await usersModel.findOne({ email: username }) )
            try {
                const user = await usersModel.findOne({ email: username });
                console.log("user", user)
                if (!user) {
                    console.log("usuario no registrado aun");

                    //el usuarioya esta registrado
                    return done(null,false);
                }
                if (!inValidPassword(password, user)) {
                    return done(null, false)
                }
                //validamos que el usuario existe y la contraseña es correcta
                return done(null,user)
            } catch (error) {
                console.log("entró aca");
                return done(error);
            }
        }
    ));


    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async(id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);//req.user= informaicon del usuraio que traemos de la bbdd
    })
}