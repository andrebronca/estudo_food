const express = require('express');
//const validate = require('express-validation');
//const paramValidation = require('../../config/param-validation');
const ContaController = require('../controller/conta.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(ContaController.list)

  /** POST /api/users - Create new user */
  .post(ContaController.create);

router.route('/:categoriaId')
  /** GET /api/users/:userId - Get user */
  .get(ContaController.get)

  /** PUT /api/users/:userId - Update user */
  .put(ContaController.update)

  /** DELETE /api/users/:userId - Delete user */
  //.delete(ContaController.remove);

  /** DELETE /api/categoria/:categoriaId - Desativa categoria */
  .delete(ContaController.desativa);

/** Load user when API with userId route parameter is hit */
router.param('contaId', ContaController.load);

module.exports = router;