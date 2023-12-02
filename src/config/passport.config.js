import passport  from "passport";
import localStrategy from "passport-local";
import { createHash, inValidPassword } from "../utils.js ";
import { usersModel } from "../dao/mongo/models/users.model.js";
import { userService } from "../dao/index.js";
import { config } from "./config.js";
import GithubStrategy from "passport-github2";
import { PRIVATE_KEY } from "../utils.js";
import jwt from "passport-jwt";


const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt; //Extraer el token (cookie,query params, body, headers)

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
                    return done(null, false);
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
            console.log("usuario", await usersModel.findOne({ email: username }))
            try {
                const user = await usersModel.findOne({ email: username });
                console.log("user", user)
                if (!user) {
                    console.log("usuario no registrado aun");

                    //el usuarioya esta registrado
                    return done(null, false);
                }
                if (!inValidPassword(password, user)) {
                    return done(null, false)
                }
                //validamos que el usuario existe y la contraseña es correcta
                return done(null, user)
            } catch (error) {
                console.log("entró aca");
                return done(error);
            }
        }
    ));

    //Estrategia de registro con github
    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080${config.github.callbackUrl}`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("profile", profile);
                const user = await usersModel.findOne({ email: profile.username });
                if (user) {
                    console.log("usuario registrado ya");

                    //el usuarioya esta registrado
                    return done(null, user);
                } else {
                    //el usuario no esta registrado
                    const newUser = {
                        first_name: profile._json.name,
                        last_name:profile._json.name,
                        age:profile.id,
                        email: profile.username,
                        password: createHash(profile.id)
                    };
                
                    console.log("nuevo usuario", newUser)
                    const userCreated = await userService.addUser(newUser);}
                } catch (error) {
                    return done(error)
                }
            }
        ));
    passport.use("jwtAuth", new JWTStrategy(
            {
                //Extraer la informacion del token
                jwtFromRequest:extractJwt.fromExtractors([cookieExtractor]),
                secretOrKey:PRIVATE_KEY
            },
            async (jwtPayload,done)=>{
                console.log("jwtPayload",jwtPayload);
                try {
                    return done(null,jwtPayload); //req.user = info del token
                } catch (error) {
                    return done(error);
                }
            }
        ));
};
const cookieExtractor = (req)=>{
    let token;
    if(req && req.cookies){ //req?.cookies
        token = req.cookies["cookiesToken"];
    } else {
        token = null;
    }
    return token;
};

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async(id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);//req.user= informaicon del usuraio que traemos de la bbdd
    })
