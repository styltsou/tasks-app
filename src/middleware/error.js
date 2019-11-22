const errorMiddleware = async (error, req, res, next) => {
  if (error) {
    res.status(400).send({ error: error.message });
  } else {
    next();
  }
};

module.exports = errorMiddleware;
