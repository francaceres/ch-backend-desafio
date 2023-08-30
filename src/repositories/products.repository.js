export default class productRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = () => {
    return this.dao.getProducts();
  };

  paginateProducts = (limit, page, filter, sort) => {
    return this.dao.paginateProducts(limit, page, filter, sort);
  };

  getProductById = (id) => {
    return this.dao.getProductById(id);
  };

  addProduct = (product) => {
    return this.dao.addProduct(product);
  };

  updateProduct = (id, product) => {
    return this.dao.updateProduct(id, product);
  };

  deleteProduct = (id) => {
    return this.dao.deleteProduct(id);
  };
}
