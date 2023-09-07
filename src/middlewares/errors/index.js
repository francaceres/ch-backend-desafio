import EnumErrors from "../../utils/errors/Enum.errors.js";

export default (error, req, res, next) => {
  // console.log(error.cause);
  req.logger.error(error.cause);
  switch (error.code) {
    case EnumErrors.ERROR_ROUTING:
      res.json({ status: "error", error: error.name });
      break;
    case EnumErrors.INVALID_TYPES_ERROR:
      res.json({ status: "error", error: error.name });
      break;
    default:
      res.json({ status: "error", error: "Unhandled error" });
  }
  next();
};
