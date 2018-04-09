const express = require('express');
//const validate = require('express-validation');
//const paramValidation = require('../../config/param-validation');
const PedidoController = require('../controller/pedido.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(PedidoController.list)

  /** POST /api/users - Create new user */
  .post(PedidoController.create);

router.route('/:pedidoId')
  /** GET /api/users/:userId - Get user */
  .get(PedidoController.get)

  /** PUT /api/users/:userId - Update user */
  .put(PedidoController.update)

  /** DELETE /api/users/:userId - Delete user */
  //.delete(PedidoController.remove);

  /** DELETE /api/pedido/:pedidoId - Desativa pedido */
  .delete(PedidoController.desativa);

/** Load user when API with userId route parameter is hit */
router.param('pedidoId', PedidoController.load);

module.exports = router;