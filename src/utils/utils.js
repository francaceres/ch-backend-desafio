import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker/locale/es";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    status: faker.datatype.boolean(0.8),
    thumbnails: [faker.image.url()],
    code: faker.number.int({ min: 1000 }),
    stock: faker.number.int({ max: 1000 }),
    _id: faker.database.mongodbObjectId(),
  };
};
