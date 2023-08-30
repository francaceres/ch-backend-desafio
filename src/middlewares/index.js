import axios from "axios";

export const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sessions/current"
      );
      const userData = response.data;

      if (!userData) {
        return res
          .status(401)
          .json({ status: "error", message: "User not found" });
      }

      if (userData.role !== role) {
        return res.status(403).json({ status: "error", message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: error });
    }
  };
};
