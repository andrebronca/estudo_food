const express = require('express');
//const validate = require('express-validation');
//const paramValidation = require('../../config/param-validation');
const ProdutoController = require('../controller/produto.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(ProdutoController.list)

  /** POST /api/users - Create new user */
  .post(ProdutoController.create);

router.route('/:produtoId')
  /** GET /api/users/:userId - Get user */
  .get(ProdutoController.get)

  /** PUT /api/users/:userId - Update user */
  .put(ProdutoController.update)

  /** DELETE /api/users/:userId - Delete user */
  //.delete(ProdutoController.remove);

  /** DELETE /api/produto/:produtoId - Desativa produto */
  .delete(ProdutoController.desativa);

/** Load user when API with userId route parameter is hit */
router.param('produtoId', ProdutoController.load);

module.exports = router;