import express from "express";
import handlebars from "express-handlebars";
import mongoConnect from "../db/index.js";

import router from "./routes/index.js";
import views from "./routes/views.router.js";

import __dirname from "./utils.js";
import { Server } from "socket.io";
import MessageManager from "./dao/mongo/manager/messages.js";

import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import config from "./config/app.config.js";

const app = express();
const PORT = config.PORT;
const httpServer = app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);
const connection = await mongoConnect();
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_URL,
      ttl: 10000,
    }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);
app.use("/", views(io));

const messagesManager = new MessageManager();

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.on("login", async () => {
    const messageLogs = await messagesManager.getMessages();
    io.emit("messageLogs", messageLogs);
  });
  socket.on("message", async (data) => {
    await messagesManager.addMessage(data);
    const messageLogs = await messagesManager.getMessages();
    io.emit("messageLogs", messageLogs);
  });
});
