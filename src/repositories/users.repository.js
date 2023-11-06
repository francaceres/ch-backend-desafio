export default class userRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers = () => {
    return this.dao.getUsers();
  };

  deleteUser = (id) => {
    return this.dao.deleteUser(id);
  };

  getUserById = (id) => {
    return this.dao.getUserById(id);
  };

  updateUser = (id, user) => {
    return this.dao.updateUser(id, user);
  };
}
