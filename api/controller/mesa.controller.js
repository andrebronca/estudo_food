const Mesa = require('../models/mesa.model');

/**
 * Load mesa and append to req.
 */
function load(req, res, next, id) {
  Mesa.get(id)
    .then((mesa) => {
      req.mesa = mesa; // eslint-disable-line no-param-reassign

      console.log( "to aqui");
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get mesa
 * @returns {Mesa}
 */
function get(req, res) {
  return res.json(req.mesa);
}

/**
 * Cria uma nova mesa
 * @property {string} req.body.descricao - Descrição mesa.
 * @property {string} req.body.cor - Cor da mesa.
 * @returns {Mesa}
 */
function create(req, res, next) {
  const mesa = new Mesa({
    descricao: req.body.descricao
  });

  mesa.save()
    .then(savedMesa => res.json(savedMesa))
    .catch(e => next(e));

}

/**
 * Atualiza uma nova mesa
 * @property {string} req.body.descricao - Descrição mesa.
 * @property {string} req.body.ativo - Status da mesa.
 * @property {string} req.body.cor - Cor da mesa.
 * @returns {Mesa}
 */
function update(req, res, next) {
  const mesa = req.mesa;
  mesa.descricao = req.body.descricao;
  //Altera somente para desativado (exclui), não atualiza
  //mesa.ativo = req.body.ativo;
  mesa.total_parcelas = req.body.total_parcelas;
  mesa.categoria = req.body.categoria;
  mesa.emissao = req.body.emissao;
  mesa.valor = req.body.valor;

  mesa.save()
    .then(savedMesa => res.json(savedMesa))
    .catch(e => next(e));
}

/**
 * Get mesa list.
 * @property {number} req.query.skip - Number of mesas to be skipped.
 * @property {number} req.query.limit - Limit number of mesas to be returned.
 * @returns {Mesa[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Mesa.list({ limit, skip })
    .then(mesas => res.json(mesas))
    .catch(e => next(e));
}

// /**
//  * Apaga mesa.
//  * @returns {Mesa}
//  */
// function remove(req, res, next) {
//   const mesa = req.mesa;
//   mesa.remove()
//     .then(deletedMesa => res.json(deletedMesa))
//     .catch(e => next(e));
// }

/**
 * Desativa uma nova mesa.
 * @returns {Mesa}
 */
function desativa(req, res, next) {
  const mesa = req.mesa;
  //mesa.descricao = req.body.descricao;
  mesa.ativo = 'n';
  //smesa.cor = req.body.cor;

  mesa.save()
    .then(savedMesa => res.json(savedMesa))
    .catch(e => next(e));
}

function pushPedido(req, res, next){

  mesa = req.mesa;

  pedido = req.body.pedido;

  mesa.pedido.push(pedido);

  mesa.save()
  .then(savedMesa => res.json(savedMesa))
  .catch(e => next(e));

}


module.exports = { load, get, create, update, list, desativa, pushPedido };