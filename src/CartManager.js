import { promises } from "fs";

export default class CartManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  createCart = async (products) => {
    const data = await this.getCarts();

    const cart = {
      id: data.length + 1 || 1,
      products: products,
    };

    if (data) {
      await promises.writeFile(
        this.#path,
        JSON.stringify([...data, cart]),
        "utf-8"
      );
    } else {
      await promises.writeFile(this.#path, JSON.stringify([cart]), "utf-8");
    }

    return "Éxito";
  };

  getCarts = async () => {
    try {
      const data = await promises.readFile(this.#path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  };

  getCartById = async (id) => {
    const data = await this.getCarts();
    const cart = data.find((item) => item.id == id);
    if (cart) {
      return cart;
    } else {
      return { error: "No hay ningún carrito con ese id" };
    }
  };

  addProductToCart = async (cid, pid) => {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id == cid);
    if (!cart) {
      return { error: "No hay ningún carrito con ese id" };
    }
    const cartIndex = carts.indexOf(cart);
    const product = cart.products.find((prod) => prod.id == pid);
    if (product) {
      const indexProduct = cart.products.indexOf(product);
      cart.products[indexProduct].quantity++;
    } else {
      cart.products.push({ id: pid, quantity: 1 });
    }
    carts[cartIndex] = cart;
    await promises.writeFile(this.#path, JSON.stringify(carts), "utf-8");
    return "Éxito";
  };
}
