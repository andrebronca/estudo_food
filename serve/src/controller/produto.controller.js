const Produto = require('../model/produto.model');

/**
 * Load produto and append to req.
 */
function load(req, res, next, id) {
  Produto.get(id)
    .then((produto) => {
      req.produto = produto; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get produto
 * @returns {Produto}
 */
function get(req, res) {
  return res.json(req.produto);
}

/**
 * Cria uma nova produto
 * @property {string} req.body.descricao - Descrição produto.
 * @property {string} req.body.cor - Cor da produto.
 * @returns {Produto}
 */
function create(req, res, next) {
  const produto = new Produto({
    descricao: req.body.descricao,
    // Toda produto fica ativa como padrão
    //ativo: req.body.ativo,
    preco: req.body.preco,
  });

  produto.save()
    .then(savedProduto => res.json(savedProduto))
    .catch(e => next(e));
}

/**
 * Atualiza um novo produto
 * @property {string} req.body.descricao - Descrição produto.
 * @property {string} req.body.ativo - Status do produto.
 * @property {string} req.body.preco - Preco do produto.
 * @returns {Produto}
 */
function update(req, res, next) {
  const produto = req.produto;
  produto.descricao = req.body.descricao;
  //Altera somente para desativado (exclui), não atualiza
  //produto.ativo = req.body.ativo;
  produto.preco = req.body.preco;

  produto.save()
    .then(savedProduto => res.json(savedProduto))
    .catch(e => next(e));
}

/**
 * Get produto list.
 * @property {number} req.query.skip - Number of produtos to be skipped.
 * @property {number} req.query.limit - Limit number of produtos to be returned.
 * @returns {Produto[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Produto.list({ limit, skip })
    .then(produtos => res.json(produtos))
    .catch(e => next(e));
}

// /**
//  * Apaga produto.
//  * @returns {Produto}
//  */
// function remove(req, res, next) {
//   const produto = req.produto;
//   produto.remove()
//     .then(deletedProduto => res.json(deletedProduto))
//     .catch(e => next(e));
// }

/**
 * Desativa uma nova produto.
 * @returns {Produto}
 */
function desativa(req, res, next) {
  const produto = req.produto;
  //produto.descricao = req.body.descricao;
  produto.ativo = 'n';
  //sproduto.cor = req.body.cor;

  produto.save()
    .then(savedProduto => res.json(savedProduto))
    .catch(e => next(e));
}


module.exports = { load, get, create, update, list, desativa };