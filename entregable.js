class ProductManager {
  #products;

  constructor() {
    this.#products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.#products.length + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    for (const prop in product) {
      if (!product[prop]) {
        return "Error: todos los campos deben ser completados";
      }
    }
    const codeCheck = this.#products.some((e) => e.code === product.code);
    if (codeCheck) {
      return "Error: ya existe un producto con ese código";
    }
    this.#products.push(product);
    return "Éxito";
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    for (let product of this.#products) {
      if (product.id === id) {
        return product;
      }
    }
    return "Error: no hay ningún producto con ese id";
  }
}
