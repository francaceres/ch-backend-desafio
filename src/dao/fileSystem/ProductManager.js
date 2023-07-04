import { promises } from "fs";

export default class ProductManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  addProduct = async (body) => {
    const data = await this.getProducts();

    const product = {
      id: data.length + 1 || 1,
      title: body.title,
      description: body.description,
      price: body.price,
      status: body.status || true,
      thumbnails: body.thumbnails || [],
      code: body.code,
      stock: body.stock,
    };
    for (const prop in product) {
      if (!product[prop]) {
        return "Error: todos los campos deben ser completados";
      }
    }

    if (data) {
      const codeCheck = data.some((e) => e.code === product.code);
      if (codeCheck) {
        return "Error: ya existe un producto con ese código";
      }
      await promises.writeFile(
        this.#path,
        JSON.stringify([...data, product]),
        "utf-8"
      );
    } else {
      await promises.writeFile(this.#path, JSON.stringify([product]), "utf-8");
    }

    return "Éxito";
  };

  getProducts = async () => {
    try {
      const data = await promises.readFile(this.#path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  };

  getProductById = async (id) => {
    const data = await this.getProducts();
    const product = data.find((prod) => prod.id == id);
    if (product) {
      return product;
    } else {
      return { error: "No hay ningún producto con ese id" };
    }
  };

  updateProduct = async (id, properties) => {
    const data = await this.getProducts();
    const product = data.find((prod) => prod.id == id);
    if (product) {
      const index = data.indexOf(product);
      data[index] = Object.assign(data[index], properties);
      await promises.writeFile(this.#path, JSON.stringify(data), "utf-8");
      return "Éxito";
    } else {
      return "Error: no hay ningún producto con ese id";
    }
  };

  deleteProduct = async (id) => {
    const data = await this.getProducts();
    const product = data.find((prod) => prod.id == id);
    if (product) {
      const index = data.indexOf(product);
      data.splice(index, 1);
      await promises.writeFile(this.#path, JSON.stringify(data), "utf-8");
      return "Éxito";
    } else {
      return "Error: no hay ningún producto con ese id";
    }
  };
}
