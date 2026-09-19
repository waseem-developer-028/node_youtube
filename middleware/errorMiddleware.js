const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

const notFound = (req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 404;
  res.status(statusCode);
  res.json({
    message: "Not Found",
  });
};

module.exports = { errorHandler, notFound };
