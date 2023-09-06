import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import UserManager from "../dao/mongo/manager/users.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import config from "./app.config.js";
import CustomErrors from "../utils/errors/Custom.errors.js";
import { generateUserErrorInfo } from "../utils/errors/Info.errors.js";
import EnumErrors from "../utils/errors/Enum.errors.js";

const userManager = new UserManager();

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { name, email } = req.body;
        try {
          if (!name || !email) {
            CustomErrors.createError({
              name: "User creation error",
              cause: generateUserErrorInfo({ name, email }),
              message: "Error trying to create user",
              code: EnumErrors.INVALID_TYPES_ERROR,
            });
            return done(null, false);
          }
          let user = await userManager.getUser({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const newUser = {
            name,
            email,
            password: createHash(password),
          };
          let result = await userManager.registerUser(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userManager.getUser({ email: username });
          if (!user) {
            return done(null, false, { message: "User or password invalid" });
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "User or password invalid" });
          }
          return done(null, user);
        } catch (error) {
          return done("Error al obtener el usuario" + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK_URL,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const user = await userManager.getUser({
            email: profile._json.email,
          });
          if (!user) {
            const newUser = {
              name: profile._json.name,
              email: profile._json.email,
              password: "",
            };
            const result = await userManager.registerUser(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done("Error al obtener el usuario " + error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = userManager.getUserById(id);
    done(null, user);
  });
};

export default initializePassport;
