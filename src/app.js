import express from "express";
import products from "./routes/products.router.js";
import carts from "./routes/carts.router.js";
import views from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();
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
app.use("/", views);

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.on("message", (data) => console.log(data));
});
