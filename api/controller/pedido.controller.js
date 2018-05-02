const Pedido = require('../models/pedido.model');
const Produto = require('../models/produto.model');
const Mesa = require('../models/mesa.model');

/**
 * Load pedido and append to req.
 */
function load(req, res, next, id) {
  Pedido.get(id)
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
  var hateoas = [{
      type: 'GET',
      url: 'http://localhost:3000/api/v1/pedidos/' + req.pedido._id
    }]
  return res.status(200).json(req.pedido,hateoas);
}

/**
 * Cria uma nova pedido
 * @property {string} req.body.cliente - Descrição pedido.
 * @property {string} req.body.cor - Cor da pedido.
 * @returns {Pedido}
 */
function create(req, res, next) {
  var item = req.body.item;
  var mesa = req.mesa;

  item.forEach(element => {
    Produto.count({'_id': element.produto})
      .then(cont => {
        if(cont <= 0){
          const err = new Error('Produto não existe');
          err.status = 404;
          //console.log(cont);
          next(err);
        }
        //console.log(cont);
      })
      .catch(e => next(e));
  });

  const pedido = new Pedido({
    cliente: req.body.cliente,
    item: item,
    valor: req.body.valor,
    mesa: mesa._id
  });

  pedido.save()
    .then(savedPedido => {

      mesa.pedido.push(pedido);

      mesa.save()
        .then(savedMesa => res.json(savedPedido))
        .catch(e => next(e));
    })
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
  pedido.item = req.body.item;
  pedido.valor = req.body.valor;
  pedido.mesa = req.body.mesa;

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
  pedidos = req.mesa.pedido;
  Pedido.list({ limit, skip, pedidos })
    .then(docs => {
      res.status(200).json({
        mensage: 'Lista de pedidos',  
        count: docs.length,
        pedidos: docs.map(doc =>{
          var links = [{
            rel: "self",
            method: 'GET',
            href: 'http://localhost:3000/api/v1/pedidos/' + doc._id
          }];
          var doc = JSON.parse(JSON.stringify(doc));
          doc.links = links;
          return doc
      })
    })
  })
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
  const mesa = req.mesa;
  pedido.ativo = 'n';

  pedido.save()
    .then(savedPedido => {
      mesa.pedido.pull(pedido._id);

      mesa.save()
      .then(savedMesa => res.json(savedPedido))
      .catch(e => next(e));
    })
    .catch(e => next(e));
}


module.exports = { load, get, create, update, list, desativa };