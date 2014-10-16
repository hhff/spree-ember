module.exports = function(app) {
  var express = require('express');
  var amsProductsRouter = express.Router();
  amsProductsRouter.get('/', function(req, res) {
    res.send({"products":[]});
  });
  app.use('/api/ams/products', amsProductsRouter);
};
