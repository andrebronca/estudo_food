var express = require('express');
var router = express.Router();

const ProdutoRouter = require('./produto.route');
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/produtos', ProdutoRouter);

module.exports = router;
