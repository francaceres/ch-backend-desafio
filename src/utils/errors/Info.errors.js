export const generateUserErrorInfo = (user) => {
  return `
    One or more properties were incomplete or not valid.
    List of required properties:
    * name: Needs to be a string, received ${user.name}
    * email: Needs to be a string, received ${user.email}
  `;
};

export const createProductErrorInfo = (product) => {
  return `
    One or more properties were incomplete or not valid.
    List of required properties:
    * title: Needs to be a string, received ${product.title}
    * category: Needs to be a string, received ${product.category}
    * description: Needs to be a string, received ${product.description}
    * price: Needs to be a number, received ${product.price}
    * code: Needs to be a string, received ${product.code}
    * stock: Needs to be a number, received ${product.stock}
    `;
};

export const getElementError = (element, id) => {
  return `
  Could not find a ${element} with the id: ${id}
  `;
};

export const missingProductsError = (products) => {
  return `
  Missing data for the creation of the cart.
  Expected an array of Ids, instead got: ${products}
  `;
};
