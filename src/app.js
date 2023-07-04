import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";

import products from "./routes/products.router.js";
import carts from "./routes/carts.router.js";
import views from "./routes/views.router.js";

import __dirname from "./utils.js";
import { Server } from "socket.io";
import MessageManager from "./dao/mongo/manager/messages.js";

const app = express();
const connection = await mongoose.connect(
  "mongodb+srv://francaceres98:coderhouse@cluster0.bvjpru0.mongodb.net/?retryWrites=true&w=majority"
);
const httpServer = app.listen(8080, () =>
  console.log("Listening on port 8080")
);
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", products(io));
app.use("/api/carts", carts);
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
