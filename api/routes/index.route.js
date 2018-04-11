var express = require('express');
var router = express.Router();

const CategoriaRoute = require('./categoria.route');
const ContaRoute = require('./conta.route');
const TituloRoute = require('./titulo.route');
const ProdutoRoute = require('./produto.route');
const PedidoRoute = require('./pedido.route');
const MesaRoute = require('./mesa.route')


router.use('/categorias', CategoriaRoute);
router.use('/contas', CategoriaRoute);
router.use('/titulos', TituloRoute);
router.use('/produtos', ProdutoRoute);
router.use('/pedidos', PedidoRoute);
router.use('/mesa', MesaRoute);


module.exports = router;
