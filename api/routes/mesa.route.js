const express = require('express');
//const validate = require('express-validation');
//const paramValidation = require('../../config/param-validation');
const MesaController = require('../controller/mesa.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(MesaController.list)

  /** POST /api/users - Create new user */
  .post(MesaController.create);

router.route('/:mesaId')
  /** GET /api/users/:userId - Get user */
  .get(MesaController.get)

  /** PUT /api/users/:userId - Update user */
  .put(MesaController.update)

  /** DELETE /api/users/:userId - Delete user */
  //.delete(MesaController.remove);

  /** DELETE /api/titulo/:mesaId - Desativa titulo */
  .delete(MesaController.desativa);

/** Load user when API with userId route parameter is hit */
router.param('mesaId', MesaController.load);

module.exports = router;