const express = require('express');
//const validate = require('express-validation');
//const paramValidation = require('../../config/param-validation');
const CategoriaController = require('../controller/categoria.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(CategoriaController.list)

  /** POST /api/users - Create new user */
  .post(CategoriaController.create);

router.route('/:categoriaId')
  /** GET /api/users/:userId - Get user */
  .get(CategoriaController.get)

  /** PUT /api/users/:userId - Update user */
  .put(CategoriaController.update)

  /** DELETE /api/users/:userId - Delete user */
  //.delete(CategoriaController.remove);

  /** DELETE /api/categoria/:categoriaId - Desativa categoria */
  .delete(CategoriaController.desativa);

/** Load user when API with userId route parameter is hit */
router.param('categoriaId', CategoriaController.load);

module.exports = router;