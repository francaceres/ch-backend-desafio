import winston from "winston";

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
};

const logger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
    new winston.transports.File({ filename: "./errors.log", level: "info" }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`${req.method} at ${req.url}`);
  next();
};
