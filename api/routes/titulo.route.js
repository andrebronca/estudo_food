const express = require('express');
//const validate = require('express-validation');
//const paramValidation = require('../../config/param-validation');
const TituloController = require('../controller/titulo.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(TituloController.list)

  /** POST /api/users - Create new user */
  .post(TituloController.create);

router.route('/:tituloId')
  /** GET /api/users/:userId - Get user */
  .get(TituloController.get)

  /** PUT /api/users/:userId - Update user */
  .put(TituloController.update)

  /** DELETE /api/users/:userId - Delete user */
  //.delete(TituloController.remove);

  /** DELETE /api/titulo/:tituloId - Desativa titulo */
  .delete(TituloController.desativa);

/** Load user when API with userId route parameter is hit */
router.param('tituloId', TituloController.load);

module.exports = router;