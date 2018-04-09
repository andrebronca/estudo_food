const Pedido = require('../models/pedido.model');

/**
 * Load pedido and append to req.
 */
function load(req, res, next, id) {
  Pedido.cria(id)
    .then((pedido) => {
      req.pedido = pedido; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get pedido
 * @returns {Pedido}
 */
function get(req, res) {
  return res.json(req.pedido);
}

/**
 * Cria uma nova pedido
 * @property {string} req.body.descricao - Descrição pedido.
 * @property {string} req.body.cor - Cor da pedido.
 * @returns {Pedido}
 */
function create(req, res, next) {
  const pedido = new Pedido({
    cliente: req.body.cliente,
    // Toda pedido fica ativa como padrão
    //ativo: req.body.ativo,
    item: req.body.item,
    //cor: req.body.cor
  });

  pedido.save()
    .then(savedPedido => res.json(savedPedido))
    .catch(e => next(e));
}

/**
 * Atualiza uma nova pedido
 * @property {string} req.body.cliente - Descrição pedido.
 * @property {string} req.body.ativo - Status da pedido.
 * @property {string} req.body.cor - Cor da pedido.
 * @returns {Pedido}
 */
function update(req, res, next) {
  const pedido = req.pedido;
  pedido.cliente = req.body.cliente;
  //Altera somente para desativado (exclui), não atualiza
  //pedido.ativo = req.body.ativo;
  pedido.item = req.body.item;

  pedido.save()
    .then(savedPedido => res.json(savedPedido))
    .catch(e => next(e));
}

/**
 * Get pedido list.
 * @property {number} req.query.skip - Number of pedidos to be skipped.
 * @property {number} req.query.limit - Limit number of pedidos to be returned.
 * @returns {Pedido[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Pedido.list({ limit, skip })
    .then(pedidos => res.json(pedidos))
    .catch(e => next(e));
}

// /**
//  * Apaga pedido.
//  * @returns {Pedido}
//  */
// function remove(req, res, next) {
//   const pedido = req.pedido;
//   pedido.remove()
//     .then(deletedPedido => res.json(deletedPedido))
//     .catch(e => next(e));
// }

/**
 * Desativa uma nova pedido.
 * @returns {Pedido}
 */
function desativa(req, res, next) {
  const pedido = req.pedido;
  //pedido.cliente = req.body.cliente;
  pedido.ativo = 'n';
  //spedido.cor = req.body.cor;

  pedido.save()
    .then(savedPedido => res.json(savedPedido))
    .catch(e => next(e));
}


module.exports = { load, get, create, update, list, desativa };