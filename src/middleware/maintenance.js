const maintenanceMiddleware = (req, res, next) => {
  res.status(503).send('The site is down for maintenance! Check back later.');
};

module.exports = maintenanceMiddleware;
