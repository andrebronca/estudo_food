const Categoria = require('../models/categoria.model');

/**
 * Load categoria and append to req.
 */
function load(req, res, next, id) {
  Categoria.get(id)
    .then((categoria) => {
      req.categoria = categoria; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get categoria
 * @returns {Categoria}
 */
function get(req, res) {
  return res.json(req.categoria);
}

/**
 * Cria uma nova categoria
 * @property {string} req.body.descricao - Descrição categoria.
 * @property {string} req.body.cor - Cor da categoria.
 * @returns {Categoria}
 */
function create(req, res, next) {
  const categoria = new Categoria({
    descricao: req.body.descricao,
    // Toda categoria fica ativa como padrão
    //ativo: req.body.ativo,
    tipo: req.body.tipo,
    cor: req.body.cor
  });

  categoria.save()
    .then(savedCategoria => res.json(savedCategoria))
    .catch(e => next(e));
}

/**
 * Atualiza uma nova categoria
 * @property {string} req.body.descricao - Descrição categoria.
 * @property {string} req.body.ativo - Status da categoria.
 * @property {string} req.body.cor - Cor da categoria.
 * @returns {Categoria}
 */
function update(req, res, next) {
  const categoria = req.categoria;
  categoria.descricao = req.body.descricao;
  //Altera somente para desativado (exclui), não atualiza
  //categoria.ativo = req.body.ativo;
  categoria.cor = req.body.cor;

  categoria.save()
    .then(savedCategoria => res.json(savedCategoria))
    .catch(e => next(e));
}

/**
 * Get categoria list.
 * @property {number} req.query.skip - Number of categorias to be skipped.
 * @property {number} req.query.limit - Limit number of categorias to be returned.
 * @returns {Categoria[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Categoria.list({ limit, skip })
    .then(categorias => res.json(categorias))
    .catch(e => next(e));
}

// /**
//  * Apaga categoria.
//  * @returns {Categoria}
//  */
// function remove(req, res, next) {
//   const categoria = req.categoria;
//   categoria.remove()
//     .then(deletedCategoria => res.json(deletedCategoria))
//     .catch(e => next(e));
// }

/**
 * Desativa uma nova categoria.
 * @returns {Categoria}
 */
function desativa(req, res, next) {
  const categoria = req.categoria;
  //categoria.descricao = req.body.descricao;
  categoria.ativo = 'n';
  //scategoria.cor = req.body.cor;

  categoria.save()
    .then(savedCategoria => res.json(savedCategoria))
    .catch(e => next(e));
}


module.exports = { load, get, create, update, list, desativa };