const fs = require("fs");

class ProductManager {
  #path;

  constructor() {
    this.#path = "data.json";
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const data = await this.getProducts();

    const product = {
      id: data.length + 1 || 1,
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

    if (data) {
      const codeCheck = data.some((e) => e.code === product.code);
      if (codeCheck) {
        return "Error: ya existe un producto con ese código";
      }
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify([...data, product]),
        "utf-8"
      );
    } else {
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify([product]),
        "utf-8"
      );
    }

    return "Éxito";
  };

  getProducts = async () => {
    return await fs.promises
      .readFile(this.#path, "utf-8")
      .then((res) => {
        return JSON.parse(res);
      })
      .catch(() => {
        return false;
      });
  };

  getProductById = async (id) => {
    const data = await this.getProducts();
    for (let product of data) {
      if (product.id === id) {
        return product;
      }
    }
    return "Error: no hay ningún producto con ese id";
  };

  updateProduct = async (id, newProduct) => {
    const data = await this.getProducts();
    for (let product of data) {
      if (product.id === id) {
        const index = data.indexOf(product);
        data[index] = newProduct;
        await fs.promises.writeFile(this.#path, JSON.stringify(data), "utf-8");
        return "Éxito";
      }
    }
    return "Error: no hay ningún producto con ese id";
  };

  deleteProduct = async (id) => {
    const data = await this.getProducts();
    for (let product of data) {
      if (product.id === id) {
        const index = data.indexOf(product);
        data.splice(index, 1);
        await fs.promises.writeFile(this.#path, JSON.stringify(data), "utf-8");
        return "Éxito";
      }
    }
    return "Error: no hay ningún producto con ese id";
  };
}

// const consultas = async () => {
//   const manager = new ProductManager();
//   console.log(
//     await manager.addProduct("Mouse", "Alto mouse", 3500, "link", "MS2", 100)
//   );

//   console.log(await manager.getProductById(2));

//   const productos = await manager.getProducts();
//   if (productos) console.log(productos);
//   else console.log("No hay productos");

//   await manager.updateProduct(1, {
//     id: 1,
//     title: "Mouse 2.0",
//     description: "Bajo mouse",
//     price: 2000,
//     thumbnail: "link",
//     code: "MS2.0",
//     stock: 100,
//   });

//   console.log(await manager.deleteProduct(1));
// };

// consultas();
