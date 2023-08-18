export default class cartService {
  constructor(dao) {
    this.dao = dao;
  }

  getCarts = () => {
    return this.dao.getCarts();
  };

  getCartById = (id) => {
    return this.dao.getCartById(id);
  };

  createCart = (products) => {
    return this.dao.createCart(products);
  };

  updateCart = (id, cart) => {
    return this.dao.updateCart(id, cart);
  };
}
