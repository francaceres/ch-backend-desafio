import config from "../config/app.config.js";
import UserDTO from "../dao/DTOs/User.dto.js";
import { usersService } from "../repositories/index.js";
import { mailerTransport } from "../utils/utils.js";

const getUsers = async (req, res) => {
  const rawUsers = await usersService.getUsers();
  const users = [];
  rawUsers.forEach((user) => {
    users.push(new UserDTO(user));
  });
  res.status(200).json({ status: "ok", data: users });
};

const getUser = async (req, res) => {
  const { uid } = req.params;
  const user = await usersService.getUserById(uid);
  res.status(200).json({ status: "ok", data: user });
};

const deleteUsers = async (req, res) => {
  const users = await usersService.getUsers();
  const currentDate = new Date();
  const twoDays = 24 * 60 * 60 * 1000;
  users.forEach(async (user) => {
    const lastConnection = new Date(user.last_connection);
    if (
      currentDate.getTime() - lastConnection.getTime() >= twoDays &&
      user.role !== "Admin"
    ) {
      await mailerTransport.sendMail({
        from: `Coder Ecommerce <${config.GMAIL_USER}>`,
        to: user.email,
        subject: "Tu usuario ha sido eliminado por inactividad",
        html: `<div>
          <h1>Tu usuario ha sido eliminado del sitio Coder Ecommerce por inactividad </h1>
        </div>`,
      });
      await usersService.deleteUser(user._id);
    }
  });
  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { newRole } = req.body;
  const user = await usersService.getUserById(uid);
  user.role = newRole;
  await usersService.updateUser(uid, user);
  res.sendStatus(204);
};

const deleteUser = async (req, res) => {
  const { uid } = req.params;
  await usersService.deleteUser(uid);
  res.sendStatus(204);
};

export default { getUsers, getUser, deleteUsers, updateUser, deleteUser };
